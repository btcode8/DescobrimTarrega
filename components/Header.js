import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

const Header = (navigation) => {
  return (
    <View style={styles.container}>
      <Icon
        name="menu"
        size={30}
        color="black"
        onPress={() => console.log("clicked")}
      />
      <Text>Hola header</Text>
      <Icon
        name="map"
        size={30}
        color="black"
        onPress={() => console.log("clicked")}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    height: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
