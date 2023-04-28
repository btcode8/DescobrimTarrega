import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import StartScreen from "./screens/StartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
    </Stack.Navigator>
  );
}
