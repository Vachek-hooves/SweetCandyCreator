import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Encyclopedia, Profile, Collections} from '../tab';
import React, {useRef, useEffect} from 'react';

const Tab = createBottomTabNavigator();

const AnimatedTabIcon = ({focused, iconSource, label}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const widthAnim = useRef(new Animated.Value(45)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animations when component mounts
    if (focused) {
      widthAnim.setValue(145);
      scaleAnim.setValue(1.2);
      opacityAnim.setValue(1);
    } else {
      widthAnim.setValue(45);
      scaleAnim.setValue(1);
      opacityAnim.setValue(0);
    }

    // Start animations after a small delay to avoid conflicts
    const timeout = setTimeout(() => {
      if (focused) {
        // Width animation (non-native)
        Animated.sequence([
          Animated.delay(50), // Small delay before starting
          Animated.spring(widthAnim, {
            toValue: 120,
            friction: 5,
            tension: 40,
            useNativeDriver: false,
          }),
        ]).start();

        // Scale and opacity animations (native)
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1.2,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Width animation (non-native)
        Animated.sequence([
          Animated.delay(50),
          Animated.spring(widthAnim, {
            toValue: 45,
            friction: 5,
            tension: 40,
            useNativeDriver: false,
          }),
        ]).start();

        // Scale and opacity animations (native)
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.tabItem,
        {
          backgroundColor: focused ? '#FDACFD' : '#F0F0F0',
          width: widthAnim,
        },
      ]}>
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <Image
          source={iconSource}
          style={[styles.icon, {tintColor: focused ? '#fff' : '#999999'}]}
          resizeMode="contain"
        />
      </Animated.View>
      {focused && (
        <Animated.Text
          style={[
            styles.activeLabel,
            {
              opacity: opacityAnim,
            },
          ]}>
          {label}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

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
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused}) => {
          let iconSource;

          switch (route.name) {
            case 'Candy':
              iconSource = require('../../assets/image/tabbar/Candy.png');
              break;
            case 'Cyclopedia':
              iconSource = require('../../assets/image/tabbar/Encyclopedia.png');
              break;
            case 'Profile':
              iconSource = require('../../assets/image/icons/add.png');
              break;
            case 'Collections':
              iconSource = require('../../assets/image/tabbar/Collections.png');
              break;
          }

          return (
            <AnimatedTabIcon
              focused={focused}
              iconSource={iconSource}
              label={route.name}
            />
          );
        },
        tabBarLabel: () => null,
        tabBarItemStyle: {
          padding: 0,
        },
      })}>
      <Tab.Screen name="Cyclopedia" component={Encyclopedia} />
      <Tab.Screen name="Candy" component={Home} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Profile" component={Profile} />
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
    minWidth: 55,
    height: 50,
    backgroundColor: 'gray',
    marginTop: 30,
  },
  activeTabItem: {
    backgroundColor: '#FDACFD',
    paddingHorizontal: 16,
    minWidth: 140,
  },
  icon: {
    width: 28,
    height: 28,
  },
  activeLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
    marginTop: 5,
  },
});
