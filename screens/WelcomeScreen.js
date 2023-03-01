import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useFonts } from "expo-font";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WelcomeScreen() {
  const [loaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuBoldItalic: require("../assets/fonts/Ubuntu-BoldItalic.ttf"),
    UbuntuItalic: require("../assets/fonts/Ubuntu-Italic.ttf"),
    UbuntuLight: require("../assets/fonts/Ubuntu-Light.ttf"),
    UbuntuLightItalic: require("../assets/fonts/Ubuntu-LightItalic.ttf"),
    UbuntuMedium: require("../assets/fonts/Ubuntu-Medium.ttf"),
    UbuntuMediumItalic: require("../assets/fonts/Ubuntu-MediumItalic.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DESCOBRIM</Text>
      <Text style={styles.title}>TÀRREGA</Text>
      <Image style={styles.image} source={require("../assets/icon.png")} />
      <Text style={styles.text}>
        Divertiu-vos i veniu a conèixer els racons més emblemàtics de Tèrrega de
        la mà de'n Moixé Natan.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comença l'aventura!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontFamily: "UbuntuBold",
  },
  image: {
    marginTop: 50,
    width: windowWidth * 0.7,
    height: windowWidth * 0.7 * (1024 / 1024),
    resizeMode: 'cover',
  },
  text: {
    paddingHorizontal: 45,
    fontSize: 23,
    marginTop: 50,
    textAlign: "center",
    color: "#595959",
    fontFamily: "Ubuntu",
  },
  button: {
    backgroundColor: "#f55d42",
    padding: 10,
    marginTop: 50,
    paddingHorizontal: 85,
    paddingVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "UbuntuBold",
    fontSize: 15,
  },
});
