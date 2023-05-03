import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Feather";
import { StyleSheet, TouchableOpacity } from "react-native";

import useCustomFonts from "../hooks/useCustomFonts";

import Home from "../screens/Home";
import Score from "../screens/Score";
import Members from "../screens/Members";
import Settings from "../screens/Settings";
import Map from "../screens/Map";
import Repte1 from "../screens/Repte1";
import Repte2 from "../screens/Repte2";
import Repte3 from "../screens/Repte3";
import Repte4 from "../screens/Repte4";
import Repte5 from "../screens/Repte5";
import Repte6 from "../screens/Repte6";
import Repte7 from "../screens/Repte7";
import Repte8 from "../screens/Repte8";
import Repte9 from "../screens/Repte9";
import Repte10 from "../screens/Repte10";
import Repte11 from "../screens/Repte11";
import Repte12 from "../screens/Repte12";
import Logout from "../screens/Logout";

import StackNavigation from "./StackNavigation";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Inici"
      screenOptions={({ route, navigation }) => ({
        drawerPosition: "left",
        headerRight:
          route.name !== "Map" &&
          (() => (
            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
              <Icon name="map" size={30} style={styles.icon} />
            </TouchableOpacity>
          )),
      })}
    >
      <Drawer.Screen
        name="Inici"
        component={Home}
        options={{ headerTitle: () => null }}
      />
      <Drawer.Screen
        name="Map"
        component={Map}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Inici")}>
              <Icon name="grid" size={30} style={styles.icon} />
            </TouchableOpacity>
          ),
          headerTitle: () => null,
        })}
      />
      <Drawer.Screen
        name="Puntuació"
        component={Score}
        options={{ headerTitle: () => null }}
      />
      <Drawer.Screen
        name="Membres"
        component={Members}
        options={{ headerTitle: () => null }}
      />
      <Drawer.Screen
        name="Configuració"
        component={Settings}
        options={{ headerTitle: () => null }}
      />
      <Drawer.Screen
        name="Sortir"
        component={Logout}
        options={{ headerTitle: () => null }}
      />
      <Drawer.Screen
        name="Repte1"
        component={Repte1}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 25, fontFamily: "UbuntuBold" },
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="Repte2"
        component={Repte2}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte3"
        component={Repte3}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte4"
        component={Repte4}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte5"
        component={Repte5}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte6"
        component={Repte6}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte7"
        component={Repte7}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte8"
        component={Repte8}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte9"
        component={Repte9}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte10"
        component={Repte10}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte11"
        component={Repte11}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Repte12"
        component={Repte12}
        options={{ headerTitle: () => null, drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{ headerShown: false, drawerItemStyle: { height: 0 } }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
    color: "black",
  },
});
