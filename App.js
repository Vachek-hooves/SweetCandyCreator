import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {CreateSweet, Welcome} from './screen/stack';
import TabNavMenu from './screen/menu/TabNavMenu';
import {AppProvider} from './store/context';
import EncyclopediaItemDetails from './screen/stack/EncyclopediaItemDetails';
import CandyDetails from './screen/stack/CandyDetails';

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
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
export default App;
