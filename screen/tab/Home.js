import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '../../store/context';
import LinearLayout from '../../components/layout/LinearLayout';
import MainLayout from '../../components/layout/MainLayout';

const egg = require('../../assets/image/vector/empty.png');

const SweetCard = ({sweet, navigation}) => {
  const candyImages = [
    require('../../assets/image/candy/candy1.png'),
    require('../../assets/image/candy/candy2.png'),
    require('../../assets/image/candy/candy3.png'),
    require('../../assets/image/candy/candy4.png'),
    require('../../assets/image/candy/candy5.png'),
  ];

  const renderCandyImage = () => {
    if (sweet.image) {
      return (
        <Image
          source={{uri: sweet.image}}
          style={styles.candyIcon}
          resizeMode="cover"
        />
      );
    }
    return (
      <Image
        source={require('../../assets/image/icons/lollipop.png')}
        style={[styles.candyIcon]}
        resizeMode="contain"
      />
    );
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('CandyDetails', {sweet})}>
      <View style={[styles.cardContent, {borderColor: sweet.packageColor}]}>
        <View
          style={[styles.imageContainer, {backgroundColor: sweet.candyColor}]}>
          {renderCandyImage()}
        </View>
        <Image
          source={candyImages[sweet.candyIndex]}
          style={[styles.candyImage, {tintColor: sweet.packageColor}]}
          resizeMode="contain"
        />
        <Text style={styles.candyName} numberOfLines={1}>
          {sweet.name}
        </Text>
        <Text style={styles.candyTaste} numberOfLines={1}>
          {sweet.taste}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

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
  // const [sweets, setSweets] = useState([]);
  const {sweets} = useAppContext();

  return (
    <LinearLayout>
      <MainLayout>
        <View style={styles.container}>
          <Text style={styles.title}>Home</Text>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}>
            {sweets.length === 0 ? (
              <EmptyState />
            ) : (
              <View style={styles.grid}>
                {sweets.map(sweet => (
                  <SweetCard
                    key={sweet.id}
                    sweet={sweet}
                    navigation={navigation}
                  />
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
              <Text style={styles.buttonText}>ADD</Text>
              <View style={styles.arrowContainer}>
                <Image
                  source={require('../../assets/image/icons/arrow.png')}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{height: 90}} /> */}
        </View>
      </MainLayout>
    </LinearLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for button
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 15,
  },
  cardContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    // padding: 10,
    borderWidth: 2,
    borderColor: '#FDACFD',
    // alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingVertical: 15,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#FDACFD',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  candyIcon: {
    width: '100%',
    height: '100%',
  },
  candyImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  candyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  candyTaste: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
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
