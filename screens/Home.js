import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

export default function Home() {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text>My app!</Text>
      <Button title="Open" onPress={() => nav.openDrawer()} />
      <Button title="Close" onPress={() => nav.closeDrawer()} />
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
