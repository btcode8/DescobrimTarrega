import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

const Repte1 = () => {
  return (
    <View>
      <View style={styles.header}>
        <Icon name="skip-back" size={30} color="black" />
        <Text style={styles.title}>Repte1</Text>
        <Icon name="info" size={30} color="black" />
      </View>
    </View>
  );
};

export default Repte1;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
