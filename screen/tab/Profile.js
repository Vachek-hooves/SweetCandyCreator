import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.title}>Profile</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/image/profile/defaultProfile.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Alexandra Mironova</Text>
        </View>
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
});
