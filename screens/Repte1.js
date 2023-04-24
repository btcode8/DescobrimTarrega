import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import useCustomFonts from "../hooks/useCustomFonts";
import YoutubePlayer from "react-native-youtube-iframe";
import { Dimensions } from "react-native";

//Importar firestore
import appFirebase from "../database/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const Repte1 = () => {
  const [playing, setPlaying] = useState(false);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.global}>
      <View style={styles.container}>
        <Text style={styles.title}>Museu comarcal de l'Urgell</Text>
        <YoutubePlayer
          style={styles.video}
          height={210}
          width={Dimensions.get("window").width*0.90}
          play={playing}
          videoId={"aTOj8ppxdCU"}
        />
        <View style={styles.textcontainer}>
          <Text style={styles.text}>
            Benvinguts a Descobrim Tàrrega
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Començem!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Repte1;

const styles = StyleSheet.create({
  global: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "UbuntuBold",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#f24726",
    paddingHorizontal: 85,
    paddingVertical: 15,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "UbuntuBold",
    fontSize: 15,
    textAlign: "center",
  },
  textcontainer: {
    width: "100%",
  },
  text: {
    fontSize: 25,
    fontFamily: "Ubuntu",
    marginVertical: 15,
  },
});
