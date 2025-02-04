import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

const MainLayout = ({children}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/image/bg/bg.png')}>
      {children}
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
