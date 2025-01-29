import {StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {useAppContext} from '../../store/context';

const Collections = ({navigation}) => {
  const {collections} = useAppContext();

  const renderCollection = ({item}) => (
    <TouchableOpacity 
      style={styles.collectionCard}
      onPress={() => navigation.navigate('CollectionDetails', {collection: item})}>
      <View style={styles.imageWrapper}>
        <Image
          source={item.image ? {uri: item.image} : require('../../assets/image/icons/placeholder.png')}
          style={styles.collectionImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.collectionName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>

      {collections.length === 0 ? (
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
      ) : (
        <FlatList
          data={collections}
          renderItem={renderCollection}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.collectionsList}
          numColumns={2}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateCollection')}>
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
  collectionsList: {
    padding: 15,
  },
  collectionCard: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 10,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
