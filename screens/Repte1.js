import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import useCustomFonts from "../hooks/useCustomFonts";
import YoutubePlayer from "react-native-youtube-iframe";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  update,
  updateDoc,
  push,
  arrayUnion,
} from "firebase/firestore";
import Home from "./Home";
import Map from "./Map";

import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore(appFirebase);

const Repte1 = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);
  const [reptesCompletats, setreptesCompletats] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teamId, setTeamId] = useState(null);

  const obtenerValor = async () => {
    try {
      const token = await AsyncStorage.getItem("teamid");
      setTeamId(token);
    } catch (error) {
      console.error(error);
    }
  };

  const carregarDadesEquip = () => {
    useEffect(() => {
      if (teamId) {
        const docRef = doc(db, "equips", teamId.toString());
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          const currentTeamData = docSnap.data();
          if (currentTeamData) {
            setCurrentTeam(currentTeamData);
            const provesCompletades = currentTeamData.proves;
            setreptesCompletats(provesCompletades);
            console.log(provesCompletades);
          }
        });
        return unsubscribe;
      }
    }, [teamId]);
  };

  obtenerValor();

  carregarDadesEquip();

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  function handleStartPress() {
    const docRef = doc(db, "equips", teamId);
    if (typeof reptesCompletats === "undefined") {
      updateDoc(docRef, {
        proves: ["1"],
      })
        .then((response) => {
          navigation.navigate("Inici");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      updateDoc(docRef, {
        proves: arrayUnion("1"),
      })
        .then((response) => {
          navigation.navigate("Inici");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <View style={styles.global}>
      <View style={styles.container}>
        <Text style={styles.title}>Museu comarcal de l'Urgell</Text>
        <YoutubePlayer
          style={styles.video}
          height={210}
          width={Dimensions.get("window").width * 0.9}
          play={playing}
          videoId={"aTOj8ppxdCU"}
        />
        <View style={styles.textcontainer}>
          <Text style={styles.text}>Benvinguts a Descobrim Tàrrega</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleStartPress()}
        >
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
