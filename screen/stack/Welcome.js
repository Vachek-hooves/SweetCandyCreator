import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MainLayout from '../../components/layout/MainLayout';

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavMenu');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // <LinearGradient
    //   colors={['#FDACFD', '#FF69B4', '#FDACFD']}
    //   style={styles.container}>
    <MainLayout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/logo/logo.png')}
          style={styles.logo}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sweet Candy</Text>
          <Text style={styles.subtitle}>Creator</Text>
        </View>
      </View>
    </MainLayout>
    // </LinearGradient>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
});
