import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {Welcome} from './screen/stack';
import TabNavMenu from './screen/menu/TabNavMenu';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 1000,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="TabNavMenu" component={TabNavMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
