import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import useCustomFonts from "../hooks/useCustomFonts";
import LoginScreen from "./LoginScreen";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WelcomeScreen({ navigation }) {
  const loaded = useCustomFonts();

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
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
    resizeMode: "cover",
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
    backgroundColor: "#f24726",
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
