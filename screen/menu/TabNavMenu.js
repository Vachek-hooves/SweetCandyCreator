import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Encyclopedia, Profile, Collections} from '../tab';
const Tab = createBottomTabNavigator();

const TabNavMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavMenu;

const styles = StyleSheet.create({});
