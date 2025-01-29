import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Encyclopedia, Profile} from '../tab';

const Tab = createBottomTabNavigator();

const TabNavMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        animation: 'fade',
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused}) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = require('../../assets/image/tabbar/Home.png');
              break;
            case 'Encyclopedia':
              iconSource = require('../../assets/image/tabbar/Encyclopedia.png');
              break;
            case 'Profile':
              iconSource = require('../../assets/image/tabbar/Profile.png');
              break;
          }

          return (
            <View style={[
              styles.tabItem,
              focused && styles.activeTabItem,
            ]}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#fff' : '#999999'},
                ]}
                resizeMode="contain"
              />
              {focused && (
                <Text style={styles.activeLabel}>
                  {route.name}
                </Text>
              )}
            </View>
          );
        },
        tabBarLabel: () => null,
        tabBarItemStyle: {
          padding: 0,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Encyclopedia"
        component={Encyclopedia}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavMenu;

const styles = StyleSheet.create({
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 25,
    minWidth: 45,
    height: 45,
    backgroundColor: '#F0F0F0',
    marginTop:30
  },
  activeTabItem: {
    backgroundColor: '#FDACFD',
    paddingHorizontal: 16,
    minWidth: 120,
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    marginTop: 5,
  },
});
