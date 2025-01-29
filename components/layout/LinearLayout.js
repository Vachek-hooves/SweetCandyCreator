import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearLayout = ({children}) => {
  return (
    <LinearGradient
      colors={['#FDACFD',  '#FDACFD', '#FFEFFF' + 10]}
      style={styles.container}>
      {children}
    </LinearGradient>
  );
};

export default LinearLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
