import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Encyclopedia, Profile, Collections} from '../tab';

const Tab = createBottomTabNavigator();

const TabNavMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          let label;

          if (route.name === 'Home') {
            iconName = require('../../assets/image/tabbar/Home.png');
            label = 'Home';
          } else if (route.name === 'Collections') {
            iconName = require('../../assets/image/tabbar/Collections.png');
            label = 'Collections';
          } else if (route.name === 'Encyclopedia') {
            iconName = require('../../assets/image/tabbar/Encyclopedia.png');
            label = 'Encyclopedia';
          } else if (route.name === 'Profile') {
            iconName = require('../../assets/image/tabbar/Profile.png');
            label = 'Profile';
          }

          return (
            <View style={[
              styles.tabItem,
              focused && styles.activeTabItem
            ]}>
              <Image
                source={iconName}
                style={[
                  styles.tabIcon,
                  focused && styles.activeTabIcon
                ]}
                resizeMode="contain"
              />
              {focused && <Text style={styles.tabLabel}>{label}</Text>}
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavMenu;

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  activeTabItem: {
    backgroundColor: '#FDACFD',
    flexDirection: 'row',
    paddingVertical: 8,
    gap: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: '#999999',
  },
  activeTabIcon: {
    tintColor: '#FFFFFF',
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
