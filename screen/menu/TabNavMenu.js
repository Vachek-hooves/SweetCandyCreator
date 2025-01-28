import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Encyclopedia, Profile, Collections} from '../tab';

const Tab = createBottomTabNavigator();

const TabNavMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: '#FDACFD',
        tabBarInactiveTintColor: '#999999',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../../assets/image/tabbar/Home.png')}
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Collections"
        component={Collections}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../../assets/image/tabbar/Collections.png')}
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Encyclopedia"
        component={Encyclopedia}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../../assets/image/tabbar/Encyclopedia.png')}
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={require('../../assets/image/tabbar/Profile.png')}
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavMenu;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
