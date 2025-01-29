import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const egg = require('../../assets/image/vector/empty.png');

const Home = ({navigation}) => {
  return (
    <View>
      <SafeAreaView>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateSweet')}>
          <Text>Create sweet</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
