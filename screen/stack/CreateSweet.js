import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

const CreateSweet = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form logic will be added later
      console.log('Form submitted:', formData);
    }
  };

  const handleImagePick = () => {
    // Image picker logic will be added later
  };

  const renderStep1 = () => (
    <View style={styles.formContainer}>
      <TouchableOpacity style={styles.imagePickerContainer} onPress={handleImagePick}>
        {formData.image ? (
          <Image source={{ uri: formData.image }} style={styles.selectedImage} />
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
        onChangeText={(text) => setFormData({...formData, name: text})}
        placeholder="Name of the candy"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formData.description}
        onChangeText={(text) => setFormData({...formData, description: text})}
        placeholder="Enter the text"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const totalSteps = 3; // Will be used for progress indication

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/image/icons/back.png')}
            style={[styles.headerIcon, { tintColor: '#FDACFD' }]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Creating candies</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {renderStep1()}
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
    width: '100%',
    height: '100%',
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
});