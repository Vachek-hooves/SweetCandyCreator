import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useCallback, useRef, useState} from 'react';
import {BackHandler, Linking, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

const INITIAL_URL = `https://brilliant-grand-happiness.space/`;
const URL_IDENTIFAIRE = `VDdJJfkx`;

const TargetScreen = ({route, navigation}) => {
  const {
    idfa,
    oneSignalUserId,
    idfv,
    applsFlyerUID,
    jthrhg,
    isFirstVisit,
    timeStamp,
    naming,
    oneSignalPermissionStatus,
    openWithPush,
  } = route.params;

  const webViewRef = useRef(null);
  const isFirstLoad = useRef(true);
  const [localOpenWithPush, setLocalOpenWithPush] = useState(false);
  const [isNonOrganicInstall, setIsNonOrganicInstall] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('about:blank'); // Initial blank page
  const [isUrlReady, setIsUrlReady] = useState(false);
  const [sabData, setSabData] = useState(null);

  const retriveSabData = useCallback(async () => {
    // console.log('retriveSabData function started');
    try {
      const storedSabData = await AsyncStorage.getItem('sabData');
      const storedIsNonOrganic = await AsyncStorage.getItem(
        'isNonOrganicInstall',
      );

      setSabData(storedSabData);
      setIsNonOrganicInstall(storedIsNonOrganic === 'true');

      return {
        sabData: storedSabData,
        isNonOrganic: storedIsNonOrganic === 'true',
      };
    } catch (error) {
      console.error('Error in retriveSabData:', error);
      return {sabData: null, isNonOrganic: false};
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // First check if WebView can go back
        if (webViewRef.current && webViewRef.current.canGoBack) {
          console.log(
            'webViewRef.current.canGoBack',
            webViewRef.current.canGoBack,
          );
          webViewRef.current.goBack();
          return true;
        }

        // Then check if can navigate back
        if (navigation.canGoBack()) {
          console.log('navigation.canGoBack()', navigation.canGoBack());
          navigation.goBack();
          return true;
        }

        // If can't go back anywhere, minimize the app
        return false;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    fetch(
      `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=webview_open&jthrhg=${timeStamp}`,
    );
  }, []);

  useEffect(() => {
    if (isFirstVisit && oneSignalPermissionStatus) {
      fetch(
        `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=push_subscribe&jthrhg=${timeStamp}`,
      );
    }
  }, [isFirstVisit, oneSignalPermissionStatus]);

  useEffect(() => {
    const sendUniqVisit = async () => {
      if (isFirstVisit) {
        const storedTimeStamp = await AsyncStorage.getItem('timeStamp');

        fetch(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=uniq_visit&jthrhg=${storedTimeStamp}`,
        );
      }
    };
    sendUniqVisit();
  }, [isFirstVisit]);

  const constructUrl = useCallback(
    (currentSabData, currentIsNonOrganic) => {
      const baseUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}?${URL_IDENTIFAIRE}=1`;
      const params = new URLSearchParams();

      params.append('idfa', idfa);
      params.append('oneSignalId', oneSignalUserId);
      params.append('idfv', idfv);
      params.append('uid', applsFlyerUID);
      params.append('customerUserId', idfv);
      params.append('jthrhg', jthrhg);

      let finalUrl = `${baseUrl}&${params.toString()}`;

      console.log('URL Construction Debug:', {
        isFirstVisit,
        currentIsNonOrganic,
        currentSabData,
      });
      if (isFirstVisit) {
        // Alert.alert('First Visit,TestScreen:'+`${currentIsNonOrganic}`);
        if (currentIsNonOrganic) {
          // Alert.alert('First Visit,Non-Organic TestScreen:'+`${currentIsNonOrganic}`);

          // Alert.alert('sabData:'+`${currentSabData}`);
          // Non-organic install cases
          finalUrl += '&testParam=NON-ORGANIC';
          if (!currentSabData) {
            // No sabData at all
            finalUrl += '&testParam=CONVERT-SUBS-MISSING-SPLITTER';
            // Alert.alert('No SabData', 'Non-organic install without sabData');
          } else if (currentSabData.includes('_')) {
            // Valid sabData with underscores
            const sabParams = currentSabData
              .split('_')
              .map((item, index) => (item ? `subId${index + 1}=${item}` : ''))
              .join('&');
            finalUrl += `&testParam=NON-ORGANIC&${sabParams}`;
            // Alert.alert('Valid SabData', `Adding params: ${sabParams}`);
          } else {
            // sabData exists but without underscores
            finalUrl += '&testParam=CONVERT-SUBS-MISSING-SPLITTER';
            // Alert.alert('Invalid SabData Format', 'SabData exists but no underscores');
          }
        } else {
          // Alert.alert('Organic install first visit');
          // Organic install
          // console.log('Organic install first visit');
          finalUrl += '&testParam=ORGANIC';
        }
      } else {
        // Subsequent visits
        if (currentIsNonOrganic && currentSabData?.includes('_')) {
          const sabParams = currentSabData
            .split('_')
            .map((item, index) => (item ? `subId${index + 1}=${item}` : ''))
            .join('&');
          finalUrl += `&${sabParams}`;
        }
        if (localOpenWithPush) {
          console.log('localOpenWithPush', localOpenWithPush);
          finalUrl += '&yhugh=true';
        }
      }
      if (!isFirstVisit) {
        if (isNonOrganicInstall && currentSabData?.includes('_')) {
          const sabParams = currentSabData
            .split('_')
            .map((item, index) => (item ? `subId${index + 1}=${item}` : ''))
            .join('&');
          finalUrl += `&${sabParams}`;
        } else {
          finalUrl;
        }
      }

      console.log('Final URL constructed:', finalUrl);
      return finalUrl;
    },
    [
      idfa,
      oneSignalUserId,
      idfv,
      applsFlyerUID,
      jthrhg,
      isFirstVisit,
      localOpenWithPush,
    ],
  );

  // Initialize push state
  useEffect(() => {
    const initPushState = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const storedPushState = await AsyncStorage.getItem('openedWithPush');
        // console.log('Initial push state check:', {
        //   storedPushState,
        //   routeOpenWithPush: route.params.openWithPush,
        // });

        const shouldEnablePush =
          storedPushState === 'true' || route.params.openWithPush;
        if (shouldEnablePush) {
          console.log('Setting localOpenWithPush to true');
          setLocalOpenWithPush(true);
          // Clear the push state immediately after reading
          await AsyncStorage.removeItem('openedWithPush');
          console.log('Cleared push state from storage');
        }
        setIsUrlReady(true);
      } catch (error) {
        console.error('Error checking push state:', error);
        setIsUrlReady(true);
      }
    };

    initPushState();
  }, [route.params.openWithPush]);

  const handleLoadStart = useCallback(async () => {
    // Alert.alert('LoadStart', 'WebView load starting');
    if (isFirstLoad.current && isUrlReady) {
      try {
        const {sabData: currentSabData, isNonOrganic: currentIsNonOrganic} =
          await retriveSabData();
        // Alert.alert('Data Retrieved', `SabData: ${currentSabData}, NonOrganic: ${currentIsNonOrganic}`);

        const generatedUrl = constructUrl(currentSabData, currentIsNonOrganic);
        // Alert.alert('URL Generated', generatedUrl);

        setWebViewUrl(generatedUrl);
        isFirstLoad.current = false;
      } catch (error) {
        Alert.alert('Error', String(error.message));
      }
    }
  }, [isUrlReady, constructUrl, retriveSabData]);

  const renderContent = () => {
    if (!isUrlReady) {
      return null;
    }

    // Wrapper function to handle the async nature of handleCustomUrl
    const onShouldStartLoadWithRequest = event => {
      // console.log('onShouldStartLoadWithRequest started');
      const {url} = event;
      // console.log('Intercepted URL:', url);
      // Handle RBC intent URL
      if (url.startsWith('intent://rbcbanking')) {
        console.log('RBC URL detected:', url);
        // Extract the scheme and package from the intent URL
        const scheme = 'rbcbanking';
        const packageName = 'com.rbc.mobile.android';

        try {
          // Try to open with custom scheme first
          console.log(
            'scheme',
            `${scheme}://${url.split('?')[1].split('#')[0]}`,
          );
          Linking.openURL(
            `${scheme}://${url.split('?')[1].split('#')[0]}`,
          ).catch(() => {
            // If custom scheme fails, try using intent
            Linking.sendIntent('android.intent.action.VIEW', [
              {key: 'package_name', value: packageName},
            ]).catch(error => {
              console.error('Error opening RBC app:', error);
              Alert.alert(
                'App Not Found',
                'The RBC banking app is not installed.',
                [{text: 'OK'}],
              );
            });
          });
        } catch (error) {
          console.error('Error parsing RBC URL:', error);
        }
        return false;
      }

      // Handle banking apps
      if (
        url.startsWith('mailto:') ||
        url.startsWith('intent://') ||
        url.startsWith('scotiabank://') ||
        url.startsWith('cibcbanking://') ||
        url.startsWith('intent://rbcbanking') ||
        url.startsWith('bncmobile:/') ||
        url.startsWith('tdct://') ||
        url.startsWith('bmoolbb://') ||
        url.startsWith('bmo://') ||
        url.startsWith('rbc://') ||
        url.startsWith('https://m.facebook.com/') ||
        url.startsWith('https://www.facebook.com/') ||
        url.startsWith('https://www.instagram.com/') ||
        url.startsWith('https://twitter.com/') ||
        url.startsWith('https://www.whatsapp.com/') ||
        url.startsWith('fb://') ||
        url.startsWith('googlepay://')
      ) {
        console.log('app url', url);

        Linking.openURL(url).catch(error => {
          Alert.alert(
            'App Not Found',
            'The requested banking app is not installed.',
            [{text: 'OK'}],
          );
        });
        return false;
      }
      // console.log('onShouldStartLoadWithRequest finished');
      // Handle regular web URLs to be opened in the webview ,logic to be added ....
      return true;
    };

    return (
      <WebView
        ref={webViewRef}
        source={{uri: webViewUrl}}
        // source={{uri: 'https://google.com'}}
        onLoadStart={handleLoadStart}
        style={{flex: 1}}
        originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
          'scotiabank://',
          'bmo://',
          'td://',
          'nbc://',
          'cibc://',
          'bmoolbb://*',
          'scotiabank://',
          'rbcbanking://',
          'tdct://',
          'cibcbanking://',
          'www.cibconline.cibc.com://',
          'secure.scotiabank.com',
          'rbc://*',
        ]}
        onLoad={() => {
          // console.log('WebView fully loaded');
          // handleWebViewLoad(); // Uncomment if prefer onLoad over onLoadStart
        }}
        onError={syntheticEvent => {
          // Alert.alert('WebView Error', syntheticEvent.nativeEvent.description);
        }}
        onLoadError={syntheticEvent => {
          // Alert.alert('Load Error', syntheticEvent.nativeEvent.description);
        }}
        thirdPartyCookiesEnabled={true}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        setSupportMultipleWindows={false} // prevent opening external browser
        onMessage={event => {
          console.log('WebView Message:', event.nativeEvent.data);
        }}
        onNavigationStateChange={navState => {
          // Updates webview's canGoBack state
          if (webViewRef.current) {
            webViewRef.current.canGoBack = navState.canGoBack;
          }
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    );
  };

  return renderContent();
};

export default TargetScreen;
