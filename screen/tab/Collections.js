import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Collections = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>

      <View style={styles.emptyContainer}>
        <Image
          source={require('../../assets/image/vector/empty.png')}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyTitle}>No collections yet</Text>
        <Text style={styles.emptyText}>
          Create your first collection of candies
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateCollection')}>
          <View></View>
          <Text style={styles.buttonText}>ADD</Text>
          <View style={styles.arrowContainer}>
            <Image
              source={require('../../assets/image/icons/arrow.png')}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: '#FDACFD',
    borderRadius: 30,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  arrowContainer: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 14,
  },
  arrowIcon: {
    width: 24,
    height: 16,
    tintColor: '#FDACFD',
  },
});
