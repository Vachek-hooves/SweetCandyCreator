import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../components/layout/MainLayout';

const EncyclopediaItemDetails = ({route, navigation}) => {
  const {item} = route.params;

  return (
    <LinearGradient
      colors={['#FFF', '#FFE5FF', '#FDACFD', '#FFE5FF']}
      style={styles.container}>
      <MainLayout>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={require('../../assets/image/icons/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{item.name}</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {/* Main Image with Gradient Overlay */}
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', '#FDACFD20']}
              style={styles.imageGradient}
            />
          </View>

          {/* Origin Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Origin</Text>
            <LinearGradient
              colors={['#FFF', '#FFE5FF']}
              style={styles.sectionGradient}>
              <Text style={styles.sectionText}>{item.origin}</Text>
            </LinearGradient>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <LinearGradient
              colors={['#FFF', '#FFE5FF']}
              style={styles.sectionGradient}>
              <Text style={styles.sectionText}>{item.features}</Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </MainLayout>
    </LinearGradient>
  );
};

export default EncyclopediaItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 32,
    height: 32,
    tintColor: '#FDACFD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  imageContainer: {
    width: '90%',
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 70,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  sectionGradient: {
    borderRadius: 15,
    // Add shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
    padding: 15,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'justify',
  },
});
