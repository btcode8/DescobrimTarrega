import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Home from "../screens/Home";
import Score from "../screens/Score";
import Members from "../screens/Members";
import Settings from "../screens/Settings";
import Map from "../screens/Map";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inici"
        screenOptions={({ route, navigation }) => ({
          drawerPosition: "left",
          headerRight:
            route.name !== "Map" &&
            (() => (
              <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                <Icon name="map" size={30} color="black" style={styles.icon} />
              </TouchableOpacity>
            )),
        })}
      >
        <Drawer.Screen name="Inici" component={Home} />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="Puntuació" component={Score} />
        <Drawer.Screen name="Membres" component={Members} />
        <Drawer.Screen name="Configuració" component={Settings} />
        <Drawer.Screen name="Sortir" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
    color: "black",
  },
});
