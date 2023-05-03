import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function eliminarValor() {
      try {
        await AsyncStorage.removeItem("name");
        navigation.navigate("StackNavigation");
      } catch (error) {
        console.error(error);
      }
    }
    eliminarValor();
  }, []);

  return null;
};

export default Logout;
