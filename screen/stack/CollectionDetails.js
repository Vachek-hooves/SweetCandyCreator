import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useAppContext} from '../../store/context';
import LinearLayout from '../../components/layout/LinearLayout';
import MainLayout from '../../components/layout/MainLayout';

const CollectionDetails = ({route, navigation}) => {
  const {collection} = route.params;
  const {encyclopediaData} = useAppContext();

  // Get full item details from encyclopediaData based on selected items
  const collectionItems = encyclopediaData.filter(item =>
    collection.items.includes(item.id),
  );

  const renderItemImage = item => {
    if (item.image) {
      return (
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="cover"
        />
      );
    }
    return (
      <Image
        source={require('../../assets/image/icons/lollipop.png')}
        style={[styles.itemImage, {tintColor: item.candyColor || '#FDACFD'}]}
        resizeMode="contain"
      />
    );
  };

  return (
    // <LinearLayout>
      <MainLayout>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/image/icons/back.png')}
                style={[styles.headerIcon, {tintColor: '#FFF'}]}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.collectionHeader}>
              <View style={styles.imageContainer}>
                {collection.image ? (
                  <Image
                    source={{uri: collection.image}}
                    style={styles.collectionImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require('../../assets/image/icons/placeholder.png')}
                    style={styles.collectionImage}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text style={styles.collectionName}>{collection.name}</Text>
              <Text style={styles.itemCount}>
                {collectionItems.length}{' '}
                {collectionItems.length === 1 ? 'item' : 'items'}
              </Text>
            </View>

            <View style={styles.itemsContainer}>
              {collectionItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemCard}
                  onPress={() =>
                    navigation.navigate('EncyclopediaItemDetails', {item})
                  }>
                  <View
                    style={[
                      styles.itemImageContainer,
                      {backgroundColor: item.candyColor || '#F5F5F5'},
                    ]}>
                    {renderItemImage(item)}
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </MainLayout>
    // </LinearLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerIcon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
  },
  collectionHeader: {
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  itemsContainer: {
    padding: 20,
    gap: 15,
  },
  itemCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default CollectionDetails;
