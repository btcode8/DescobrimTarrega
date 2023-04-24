import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import DrawerNavigation from "./components/DrawerNavigation";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Members from "./screens/Members";
import Score from "./screens/Score";
import Map from "./screens/Map";

import WelcomeScreen from "./screens/WelcomeScreen";
import StartScreen from "./screens/StartScreen";

import { Fragment } from "react";
import Repte1 from "./screens/Repte1";
import Repte2 from "./screens/Repte2";
import Repte3 from "./screens/Repte3";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  return <DrawerNavigation />;
  // return <Repte1 />;
}
