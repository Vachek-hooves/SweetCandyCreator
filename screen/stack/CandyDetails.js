import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/layout/MainLayout';

const CandyDetails = ({route, navigation}) => {
  const {sweet} = route.params;
  const {deleteSweet} = useAppContext();

  const candyImages = [
    require('../../assets/image/candy/candy1.png'),
    require('../../assets/image/candy/candy2.png'),
    require('../../assets/image/candy/candy3.png'),
    require('../../assets/image/candy/candy4.png'),
    require('../../assets/image/candy/candy5.png'),
  ];

  const handleDelete = () => {
    Alert.alert('Delete Candy', 'Are you sure you want to delete this candy?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const success = await deleteSweet(sweet.id);
          if (success) {
            navigation.goBack();
          }
        },
      },
    ]);
  };

  const renderCandyImage = () => {
    if (sweet.image) {
      return (
        <Image
          source={{uri: sweet.image}}
          style={[styles.candyIcon]}
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
    <LinearGradient
      colors={['#FFEFFF' + 10, '#FDACFD', '#FDACFD' + 10]}
      style={{flex: 1}}>
      <MainLayout>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/image/icons/back.png')}
                style={[styles.headerIcon, {tintColor: '#FDACFD'}]}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{sweet.name}</Text>
            <TouchableOpacity onPress={handleDelete}>
              {/* <TouchableOpacity> */}
              <Image
                source={require('../../assets/image/icons/delete.png')}
                style={[styles.headerIcon, {tintColor: '#FF4444'}]}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.candyPreview}>
              <View
                style={[
                  styles.imageContainer,
                  {backgroundColor: sweet.candyColor},
                ]}>
                {renderCandyImage()}
              </View>
              <Image
                source={candyImages[sweet.candyIndex]}
                style={[styles.candyImage, {tintColor: sweet.packageColor}]}
                resizeMode="contain"
              />
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{sweet.name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Taste</Text>
                <Text style={styles.value}>{sweet.taste}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Shape</Text>
                <Text style={styles.value}>{sweet.shape}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.description}>{sweet.description}</Text>
              </View>

              <View style={styles.colorSection}>
                <View style={styles.colorRow}>
                  <Text style={styles.label}>Candy Color</Text>
                  <View
                    style={[
                      styles.colorPreview,
                      {backgroundColor: sweet.candyColor},
                    ]}
                  />
                </View>
                <View style={styles.colorRow}>
                  <Text style={styles.label}>Package Color</Text>
                  <View
                    style={[
                      styles.colorPreview,
                      {backgroundColor: sweet.packageColor},
                    ]}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </MainLayout>
    </LinearGradient>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerIcon: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  candyPreview: {
    alignItems: 'center',
    padding: 30,
    position: 'relative',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  candyIcon: {
    width: '100%',
    height: '100%',
  },
  candyImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 40,
    right: 40,
  },
  detailsContainer: {
    padding: 20,
  },
  detailRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  colorSection: {
    marginTop: 20,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default CandyDetails;
