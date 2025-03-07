import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateSweet,
  Welcome,
  CollectionDetails,
  CreateCollection,
  CandyDetails,
  EncyclopediaItemDetails,
} from './screen/stack';
import TabNavMenu from './screen/menu/TabNavMenu';
import {AppProvider} from './store/context';
import {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const generateTimestampUserId = () => {
  return `${new Date().getTime()}-${Math.floor(
    1000000 + Math.random() * 9000000,
  )}`;
};

const INITIAL_URL = `https://brilliant-grand-happiness.space/`;
const URL_IDENTIFAIRE = `KDN6BhkQ`;
const targetData = new Date('2025-03-06T10:00:00Z');
const currentDate = new Date();

function App() {
  const [isOneSignalReady, setIsOneSignalReady] = useState(false);
  const [oneSignalUserId, setOneSignalUserId] = useState(null);
  const [oneSignalPermissionStatus, setOneSignalPermissionStatus] =
    useState(false);
  

  useEffect(() => {
    const initOneSignal = async () => {
      // Remove this method to stop OneSignal Debugging
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      // OneSignal Initialization
      OneSignal.initialize('d750ad28-3354-47e3-9798-9e84d42eb337');

      try {
        // Request permission and get user ID
        const permissionResult =
          await OneSignal.Notifications.requestPermission(true);
        // console.log('OneSignal permission result:', permissionResult);
        setOneSignalPermissionStatus(permissionResult);

        // if (permissionResult) {
        // console.log('OneSignal: user id:', userId);
        const userId = await OneSignal.User.getOnesignalId();

        if (userId) {
          setOneSignalUserId(userId);
          await AsyncStorage.setItem('oneSignalUserId', userId);
          setIsOneSignalReady(true);
        } else {
          // If no userId, set up a listener for when it becomes available
          const userStateChangedListener = OneSignal.User.addEventListener(
            'change',
            async event => {
              const newUserId = await OneSignal.User.getOnesignalId();
              if (newUserId) {
                // console.log('OneSignal: got delayed user id:', newUserId);
                setOneSignalUserId(newUserId);
                await AsyncStorage.setItem('oneSignalUserId', newUserId);
                setIsOneSignalReady(true);
                userStateChangedListener.remove();
              }
            },
          );
        }
        // }
      } catch (error) {
        console.error('Error initializing OneSignal:', error);
        // Fallback: try to get stored userId
        const storedUserId = await AsyncStorage.getItem('oneSignalUserId');
        if (storedUserId) {
          setOneSignalUserId(storedUserId);
          setIsOneSignalReady(true);
        }
      }
    };

    initOneSignal();
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 1000,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="TabNavMenu" component={TabNavMenu} />
          <Stack.Screen
            name="EncyclopediaItemDetails"
            component={EncyclopediaItemDetails}
          />
          <Stack.Screen name="CreateSweet" component={CreateSweet} />
          <Stack.Screen name="CandyDetails" component={CandyDetails} />
          <Stack.Screen name="CreateCollection" component={CreateCollection} />
          <Stack.Screen
            name="CollectionDetails"
            component={CollectionDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
export default App;
