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
