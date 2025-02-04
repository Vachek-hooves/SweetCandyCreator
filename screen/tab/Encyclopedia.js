import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useAppContext} from '../../store/context';
import LinearLayout from '../../components/layout/LinearLayout';
import MainLayout from '../../components/layout/MainLayout';

const EncyclopediaItem = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => {
      navigation.navigate('EncyclopediaItemDetails', {item});
    }}>
    <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
    <Text style={styles.itemName}>{item.name}</Text>
  </TouchableOpacity>
);

const Encyclopedia = ({navigation}) => {
  const {encyclopediaData, isLoading} = useAppContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    // <LinearLayout>
      <MainLayout>
        <View style={styles.container}>
          <Text style={styles.title}>Encyclopedia</Text>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {encyclopediaData.map(item => (
                <EncyclopediaItem
                  key={item.id}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </MainLayout>
    // </LinearLayout>
  );
};

export default Encyclopedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%', // Slightly less than 50% to account for spacing
    marginBottom: 15,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FDACFD',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 23, // Slightly less than container to account for border
  },
  itemName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
