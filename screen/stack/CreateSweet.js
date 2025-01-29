import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateSweet = ({navigation}) => {
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
            style={[styles.headerIcon, { tintColor: '#FDACFD' }]}
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
        onPress={() => {
          /* Color picker logic */
        }}>
        <Text style={styles.colorButtonText}>Color of the candy</Text>
        <Image
          source={require('../../assets/image/icons/arrow.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.colorButton}
        onPress={() => {
          /* Package color picker logic */
        }}>
        <Text style={styles.colorButtonText}>Package color</Text>
        <Image
          source={require('../../assets/image/icons/arrow.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
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
          onPress={() => setFormData({...formData, taste: tasteOption})}>
          <Text
            style={[
              styles.tasteText,
              formData.taste === tasteOption && styles.selectedTasteText,
            ]}>
            {tasteOption}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const totalSteps = 3;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderHeaderLeft()}
        <Text style={styles.headerTitle}>Creating candies</Text>
        <TouchableOpacity 
          onPress={handleNext}
          disabled={currentStep === 1 && !isStep1Valid}
        >
          <Text style={[
            styles.nextButton,
            (currentStep === 1 && !isStep1Valid) && styles.nextButtonDisabled
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
    </View>
  );
};

export default CreateSweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nextButton: {
    color: '#FDACFD',
    fontSize: 18,
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
    width: 24,
    height: 24,
    tintColor: '#FDACFD',
  },
  nextButtonDisabled: {
    opacity: 0.5,
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
    color: '#FDACFD',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
