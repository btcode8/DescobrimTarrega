import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import StartScreen from "./screens/StartScreen";
// import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return <StartScreen />;
}
