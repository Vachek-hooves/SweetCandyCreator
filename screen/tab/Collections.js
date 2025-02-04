import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import LinearLayout from '../../components/layout/LinearLayout';
import MainLayout from '../../components/layout/MainLayout';

const Collections = ({navigation}) => {
  const {collections, deleteCollection} = useAppContext();

  const handleDelete = collection => {
    Alert.alert(
      'Delete Collection',
      `Are you sure you want to delete "${collection.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteCollection(collection.id);
            if (!success) {
              Alert.alert('Error', 'Failed to delete collection');
            }
          },
        },
      ],
    );
  };

  const renderCollection = ({item}) => (
    <View style={styles.collectionCard}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() =>
          navigation.navigate('CollectionDetails', {collection: item})
        }>
        <View style={styles.imageWrapper}>
          <Image
            source={
              item.image
                ? {uri: item.image}
                : require('../../assets/image/icons/placeholder.png')
            }
            style={styles.collectionImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.collectionName}>{item.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}>
        <Image
          source={require('../../assets/image/icons/delete.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearLayout>
      <MainLayout>
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
      </MainLayout>
    </LinearLayout>
  );
};

export default Collections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    position: 'relative',
  },
  cardContent: {
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteIcon: {
    width: 32,
    height: 32,
    tintColor: '#FF6B6B',
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
