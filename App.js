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

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Members from "./screens/Members";
import Score from "./screens/Score";
import Map from "./screens/Map";

import WelcomeScreen from "./screens/WelcomeScreen";
import StartScreen from "./screens/StartScreen";
import StartScreen from "./screens/StartScreen";

import Header from "./components/Header";
import { Fragment } from "react";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  return (
    // <Map />
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inici"
        screenOptions={{
          drawerPosition: "left",
        }}
      >
        <Drawer.Screen
          name="Inici"
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log("obrir mapa")}>
                <Icon name="map" size={30} color="black" style={styles.icon} />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen name="Puntuació" component={Score} />
        <Drawer.Screen name="Membres" component={Members} />
        <Drawer.Screen name="Configuració" component={Settings} />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="Sortir" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
  },
});
