import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppContext} from '../../store/context';
import MainLayout from '../../components/layout/MainLayout';

const CreateCollection = ({navigation}) => {
  const {encyclopediaData, saveCollection} = useAppContext();
  const [collectionImage, setCollectionImage] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setCollectionImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleItemSelect = itemId => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleSave = async () => {
    if (!collectionName.trim()) {
      Alert.alert('Error', 'Please enter a collection name');
      return;
    }

    if (selectedItems.length === 0) {
      Alert.alert('Error', 'Please select at least one item');
      return;
    }

    setIsLoading(true);
    try {
      const newCollection = {
        name: collectionName,
        image: collectionImage,
        items: selectedItems,
      };

      const success = await saveCollection(newCollection);

      if (success) {
        Alert.alert('Success', 'Collection saved successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        throw new Error('Failed to save collection');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save collection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItemImage = item => {
    console.log(item);
    if (item.image) {
      return (
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="cover"
        />
      );
    }
    // Fallback to default candy icon if no image
    return (
      <Image
        source={require('../../assets/image/icons/lollipop.png')}
        style={[styles.itemImage, {tintColor: item.candyColor || '#FDACFD'}]}
        resizeMode="contain"
      />
    );
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/image/icons/back.png')}
              style={[styles.headerIcon, {tintColor: '#FDACFD'}]}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Creating collection</Text>
          <TouchableOpacity onPress={handleSave} disabled={isLoading}>
            <Text
              style={[
                styles.nextButton,
                isLoading && styles.nextButtonDisabled,
              ]}>
              {isLoading ? 'Saving...' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <TouchableOpacity
            style={styles.imagePickerContainer}
            onPress={handleImagePick}>
            {collectionImage ? (
              <Image
                source={{uri: collectionImage}}
                style={styles.collectionImage}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Image
                  source={require('../../assets/image/icons/camera.png')}
                  style={styles.cameraIcon}
                />
                <Text style={styles.imagePlaceholderText}>
                  Add collection image
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.nameInput}
            value={collectionName}
            onChangeText={setCollectionName}
            placeholder="Collection name"
            placeholderTextColor="#999"
          />

          <View style={styles.itemsContainer}>
            {encyclopediaData.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemCard,
                  selectedItems.includes(item.id) && styles.selectedCard,
                ]}
                onPress={() => handleItemSelect(item.id)}>
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
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedItems.includes(item.id) &&
                        styles.radioOuterSelected,
                    ]}>
                    {selectedItems.includes(item.id) && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </MainLayout>
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
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextButton: {
    color: '#FDACFD',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imagePickerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#999',
    marginBottom: 10,
  },
  imagePlaceholderText: {
    color: '#999',
    fontSize: 16,
  },
  nameInput: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  itemsContainer: {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#FDACFD',
    backgroundColor: '#FDACFD10',
  },
  itemImageContainer: {
    width: 80,
    height: 80,
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
  radioContainer: {
    marginLeft: 15,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FDACFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    backgroundColor: '#FDACFD20',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FDACFD',
  },
});

export default CreateCollection;
