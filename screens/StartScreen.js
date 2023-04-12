import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useCustomFonts from "../hooks/useCustomFonts";

export default function WelcomeScreen() {
  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Benvinguts a</Text>
      <Text style={styles.title}>DESCOBRIM TÀRREGA</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat
        luctus erat, non dapibus orci tincidunt vel. Aliquam erat volutpat.
        Proin pulvinar faucibus tempor. Donec tincidunt quis mauris at vehicula.
        Sed consectetur elit mauris, at mollis mauris efficitur vitae. Nullam ac
        efficitur erat. Donec bibendum porta ligula, a feugiat purus suscipit
        et.
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Personalitzar equip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => {}}>
          <Text style={styles.buttonText2}>Començar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "UbuntuBold",
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Ubuntu",
    color: "#595959",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
    lineHeight: 35,
    fontFamily: "Ubuntu",
    color: "#595959",
  },
  buttons: {
    flexDirection: "column",
    marginVertical: 10,
  },
  button1: {
    backgroundColor: "white",
    paddingHorizontal: 60,
    paddingVertical: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#f24726",
  },
  buttonText1: {
    color: "#f24726",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  button2: {
    backgroundColor: "#f24726",
    paddingHorizontal: 60,
    paddingVertical: 10,
    marginVertical: 5,
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
