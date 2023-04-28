import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout() {

    async function guardarValor(userData) {
        try {
            await AsyncStorage.removeItem("name");
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <View style={styles.container}>
      <Text>Pantalla Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });