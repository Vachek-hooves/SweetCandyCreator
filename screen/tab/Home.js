import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const egg = require('../../assets/image/vector/empty.png');

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Image
      source={require('../../assets/image/vector/empty.png')}
      style={styles.emptyImage}
      resizeMode="contain"
    />
  </View>
);

const Home = ({navigation}) => {
  const [sweets, setSweets] = useState([]);

  // Load sweets from AsyncStorage
  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      const storedSweets = await AsyncStorage.getItem('@user_sweets');
      if (storedSweets) {
        setSweets(JSON.parse(storedSweets));
      }
    } catch (error) {
      console.error('Error loading sweets:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        {sweets.length === 0 ? (
          <EmptyState />
        ) : (
          // Render sweets list here when implemented
          <View style={styles.sweetsContainer}>
            {sweets.map(sweet => (
              // Sweet item component will go here
              <View key={sweet.id}>
                <Text>{sweet.name}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Sweet Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateSweet')}>
            <View></View>
          <Text style={styles.buttonText}>Add</Text>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, // To account for the button space
  },
  emptyImage: {
    width: 250,
    height: 250,
  },
  sweetsContainer: {
    padding: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 90, // Adjust based on your tab bar height
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  arrowIcon: {
    width: 24,
    height: 16,
    tintColor: '#FDACFDff',
  },
  arrowContainer: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 14,
  },
});
