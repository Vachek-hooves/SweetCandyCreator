import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import ColorPicker from 'react-native-wheel-color-picker';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/layout/MainLayout';
const CreateSweet = ({navigation}) => {
  const {saveSweet, sweets} = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    shape: '',
    candyColor: '',
    packageColor: '',
    taste: '',
  });
  console.log(formData);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerType, setColorPickerType] = useState(null); // 'candy' or 'package'
  const [tempColor, setTempColor] = useState('#FFFFFF');
  const [currentCandyIndex, setCurrentCandyIndex] = useState(0);
  const [customTaste, setCustomTaste] = useState('');
  const [colorPickerUsed, setColorPickerUsed] = useState(false);
  const candyImages = [
    require('../../assets/image/candy/candy2.png'),
    require('../../assets/image/candy/candy3.png'),
    require('../../assets/image/candy/candy4.png'),
    require('../../assets/image/candy/candy1.png'),
    require('../../assets/image/candy/candy5.png'),
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form logic will be added later
      console.log('Form submitted:', formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets?.[0]) {
      setFormData({...formData, image: result.assets[0].uri});
    }
  };

  const handleColorPress = type => {
    setColorPickerType(type);
    setTempColor(
      type === 'candy'
        ? formData.candyColor || '#FFFFFF'
        : formData.packageColor || '#FFFFFF',
    );
    setShowColorPicker(true);
    setColorPickerUsed(false);
  };

  const handleColorSelect = () => {
    if (colorPickerType === 'candy') {
      setFormData({...formData, candyColor: tempColor});
    } else {
      setFormData({...formData, packageColor: tempColor});
    }
    setShowColorPicker(false);
    setColorPickerUsed(true);
  };

  const isStep1Valid =
    formData.name.trim() !== '' && formData.description.trim() !== '';

  const shapes = ['Round', 'Starry', 'Heart', 'Square', 'Triangular'];
  const tastes = ['Strawberry', 'Vanilla', 'Chocolate', 'Mint', 'Raspberry'];

  const renderHeaderLeft = () => {
    if (currentStep === 1) {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/image/icons/back.png')}
            style={[styles.headerIcon, {tintColor: '#FFF'}]}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.prevButton}>Prev</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderStep1 = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity
        style={styles.imagePickerContainer}
        onPress={handleImagePick}>
        {formData.image ? (
          <Image source={{uri: formData.image}} style={styles.selectedImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Image
              source={require('../../assets/image/icons/image.png')}
              style={styles.imageIcon}
            />
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Name of the candy</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={text => setFormData({...formData, name: text})}
        placeholder="Name of the candy"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formData.description}
        onChangeText={text => setFormData({...formData, description: text})}
        placeholder="Enter the text"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const renderCandyPreview = () => (
    <View style={styles.candyPreviewContainer}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          if (currentCandyIndex > 0) {
            setCurrentCandyIndex(currentCandyIndex - 1);
          }
        }}>
        <Image
          source={require('../../assets/image/icons/arrow.png')}
          style={[styles.arrowIcon, styles.leftArrow]}
        />
      </TouchableOpacity>

      <View style={styles.candyImageContainer}>
        <View
          style={[styles.candyBackground, {backgroundColor: '#FDACFD20'}]}
          key={`${formData.packageColor}-${colorPickerUsed}`}>
          <Image
            source={candyImages[currentCandyIndex]}
            style={[
              styles.candyImage,
              formData.packageColor && {tintColor: formData.packageColor},
            ]}
            resizeMode="contain"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          if (currentCandyIndex < candyImages.length - 1) {
            setCurrentCandyIndex(currentCandyIndex + 1);
          }
        }}>
        <Image
          source={require('../../assets/image/icons/arrow.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.label}>The shape of the candies</Text>
      {shapes.map(shape => (
        <TouchableOpacity
          key={shape}
          style={[
            styles.shapeButton,
            formData.shape === shape && styles.selectedShape,
          ]}
          onPress={() => setFormData({...formData, shape})}>
          <Text
            style={[
              styles.shapeText,
              formData.shape === shape && styles.selectedShapeText,
            ]}>
            {shape}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.colorButton}
        onPress={() => handleColorPress('candy')}>
        <Text style={styles.colorButtonText}>Color of the candy</Text>
        <View style={styles.colorPreviewContainer}>
          {formData.candyColor && (
            <View
              style={[
                styles.colorPreview,
                {backgroundColor: formData.candyColor},
              ]}
            />
          )}
          <Image
            source={require('../../assets/image/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.colorButton}
        onPress={() => handleColorPress('package')}>
        <Text style={styles.colorButtonText}>Package color</Text>
        <View style={styles.colorPreviewContainer}>
          {formData.packageColor && (
            <View
              style={[
                styles.colorPreview,
                {backgroundColor: formData.packageColor},
              ]}
            />
          )}
          <Image
            source={require('../../assets/image/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>

      {renderCandyPreview()}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.label}>The taste of candy</Text>
      {tastes.map(tasteOption => (
        <TouchableOpacity
          key={tasteOption}
          style={[
            styles.tasteButton,
            formData.taste === tasteOption && styles.selectedTaste,
          ]}
          onPress={() => {
            setFormData({...formData, taste: tasteOption});
            setCustomTaste(''); // Clear custom taste when selecting predefined
          }}>
          <Text
            style={[
              styles.tasteText,
              formData.taste === tasteOption && styles.selectedTasteText,
            ]}>
            {tasteOption}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Custom Taste Section */}
      <View style={styles.customTasteContainer}>
        <Text style={[styles.label, {marginTop: 20}]}>
          Or add your own taste
        </Text>
        <View style={styles.customTasteInputContainer}>
          <TextInput
            style={styles.customTasteInput}
            value={customTaste}
            onChangeText={text => {
              setCustomTaste(text);
              if (text) {
                setFormData({...formData, taste: text});
              }
            }}
            placeholder="Enter custom taste"
            placeholderTextColor="#999"
          />
          {customTaste ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setCustomTaste('');
                setFormData({...formData, taste: ''});
              }}>
              <Image
                source={require('../../assets/image/icons/close.png')}
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );

  const totalSteps = 3;

  const handleSubmit = async () => {
    const success = await saveSweet({
      name: formData.name,
      description: formData.description,
      image: formData.image,
      shape: formData.shape,
      candyColor: formData.candyColor,
      packageColor: formData.packageColor,
      taste: formData.taste,
      candyIndex: currentCandyIndex,
    });

    if (success) {
      navigation.goBack(); // Return to previous screen on success
    } else {
      // Handle error - you might want to show an alert or error message
      Alert.alert('Error', 'Failed to save candy. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#FDACFD', '#FFFFFF']} style={styles.container}>
      <MainLayout>
        <View style={styles.container}>
          <View style={styles.header}>
            {renderHeaderLeft()}
            <Text style={styles.headerTitle}>Creating candies</Text>
            <TouchableOpacity
              onPress={currentStep === totalSteps ? handleSubmit : handleNext}
              disabled={currentStep === 1 && !isStep1Valid}>
              <Text
                style={[
                  styles.nextButton,
                  currentStep === 1 &&
                    !isStep1Valid &&
                    styles.nextButtonDisabled,
                ]}>
                {currentStep === totalSteps ? 'Create' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {currentStep === 1
              ? renderStep1()
              : currentStep === 2
              ? renderStep2()
              : renderStep3()}
          </ScrollView>

          <Modal visible={showColorPicker} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {colorPickerType === 'candy'
                    ? 'Select Candy Color'
                    : 'Select Package Color'}
                </Text>

                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    color={tempColor}
                    onColorChange={setTempColor}
                    thumbSize={30}
                    sliderSize={30}
                    noSnap={true}
                    row={false}
                  />
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowColorPicker(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalButtonConfirm]}
                    onPress={handleColorSelect}>
                    <Text
                      style={[
                        styles.modalButtonText,
                        styles.modalButtonTextConfirm,
                      ]}>
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </MainLayout>
    </LinearGradient>
  );
};

export default CreateSweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nextButton: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  imagePickerContainer: {
    // width: 150,
    // height: 150,
    borderRadius: 75,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    // Add shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    width: '100%',
    height: '100%',
    // tintColor: '#999',
  },
  selectedImage: {
    width: 300,
    height: 250,
    borderRadius: 75,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  shapeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedShape: {
    backgroundColor: '#FDACFD20',
    borderColor: '#FDACFD',
    borderWidth: 3,
  },
  shapeText: {
    fontSize: 18,
    color: '#666',
  },
  selectedShapeText: {
    color: '#FDACFD',
    fontWeight: 'bold',
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  colorButtonText: {
    fontSize: 18,
    color: '#666',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  arrowIcon: {
    width: 30,
    height: 24,
    tintColor: '#FDACFD',
  },
  nextButtonDisabled: {
    opacity: 0.3,
  },
  tasteButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedTaste: {
    backgroundColor: '#FDACFD20',
    borderColor: '#FDACFD',
    borderWidth: 3,
  },
  tasteText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  selectedTasteText: {
    color: '#FDACFD',
    fontWeight: 'bold',
  },
  prevButton: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  colorPickerContainer: {
    height: 300,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  modalButtonConfirm: {
    backgroundColor: '#FDACFD',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modalButtonTextConfirm: {
    color: 'white',
  },
  colorPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  candyPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDACFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    transform: [{rotate: '180deg'}],
  },
  candyImageContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  candyBackground: {
    width: 200,
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candyImage: {
    width: 120,
    height: 120,
  },
  customTasteContainer: {
    marginTop: 10,
  },
  customTasteInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    marginTop: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  customTasteInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  clearIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
});
