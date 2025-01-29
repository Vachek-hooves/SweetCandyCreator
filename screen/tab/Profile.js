import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileCard = ({ userName, userImage, onImagePress, onDeletePress }) => (
  <View style={styles.profileCardContainer}>
    <View style={styles.profileCard}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={onImagePress}>
          <Image
            source={userImage ? {uri: userImage} : require('../../assets/image/profile/defaultProfile.png')}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconContainer}>
            {/* <Icon name="camera" size={20} color="#fff" /> */}
            <Image source={require('../../assets/image/icons/edit.png')} style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.email}>alexandra.mironova-7902@yopmail.com</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={onDeletePress}
      >
        {/* <Icon name="delete" size={24} color="#FF4444" /> */}
        <Image source={require('../../assets/image/icons/delete.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

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

  const handleDeleteProfile = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@user_name');
              await AsyncStorage.removeItem('@user_image');
              setUserName('');
              setUserImage(null);
              Alert.alert('Success', 'Profile deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <ProfileCard 
        userName={userName}
        userImage={userImage}
        onImagePress={pickImage}
        onDeletePress={handleDeleteProfile}
      />

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
  profileCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: '#FDACFD',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    // Custom shape styling
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // Add shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    // backgroundColor: '#FDACFD',
    borderRadius: 15,
    // width: 30,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
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
  deleteIcon: {
    width: 32,
    height: 32,
    tintColor: '#F93827',
  },
  cameraIcon: {
    width: 36,
    height: 36,
    tintColor: '#00F4F7',
    // padding: 15,
  },
});
