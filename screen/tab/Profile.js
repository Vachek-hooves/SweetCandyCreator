import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = () => {
  const [userName, setUserName] = useState('Alexandra Mironova');
  const [userImage, setUserImage] = useState(null);

  // Load user data when component mounts
  useEffect(() => {
    loadUserData();
  }, []);

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('@user_name');
      const storedImage = await AsyncStorage.getItem('@user_image');
      
      if (storedName) setUserName(storedName);
      if (storedImage) setUserImage(storedImage);
    } catch (error) {
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  // Save user data to AsyncStorage
  const saveUserData = async (name, image) => {
    try {
      await AsyncStorage.setItem('@user_name', name);
      if (image) await AsyncStorage.setItem('@user_image', image);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ' + response.error);
      } else {
        const imageUri = response.assets[0].uri;
        setUserImage(imageUri);
        saveUserData(userName, imageUri);
      }
    });
  };

  // Update user name
  const updateName = async (newName) => {
    setUserName(newName);
    await saveUserData(newName, userImage);
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.title}>Profile</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              userImage
                ? {uri: userImage}
                : require('../../assets/image/profile/defaultProfile.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            Alert.prompt(
              'Update Name',
              'Enter your new name',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Update',
                  onPress: (newName) => updateName(newName)
                }
              ],
              'plain-text',
              userName
            );
          }}
        >
          <Text style={styles.name}>{userName}</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Developer Website</Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Privacy Policy</Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Terms of Use</Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileImageContainer: {
    // width: 80,
    // height: 80,
    // borderRadius: '50%',
    marginBottom: 10,
    backgroundColor: '#FFB6F3',
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
  },
  profileInfo: {
    // marginLeft: 10,
    backgroundColor: '#FFB6F3',
    // padding: 10,
    borderRadius: 40,
    top: -40,
    paddingTop: 30,
    paddingBottom: 10,
    // paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  profileCard: {
    // backgroundColor: '#FFB6F3',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 90,
    marginBottom: 10,
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 26,
    color: '#FFF',
    padding: 15,
  },
  arrowContainer: {
    backgroundColor: '#FFB6F3',
    borderRadius: 50,
    // padding: 5,
    // borderRadius: 5,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});
