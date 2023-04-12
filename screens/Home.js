import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

import useCustomFonts from "../hooks/useCustomFonts";

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

const db = getFirestore(appFirebase);

export default function Home() {
  const [reptes, setReptes] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "proves");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const reptesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        coordinate: {
          latitude: doc.data().ubicacio.latitude,
          longitude: doc.data().ubicacio.longitude,
        },
        titol: doc.data().titol,
        descripcio: doc.data().descripcio,
      }));
      setReptes(reptesData);
    });
    return unsubscribe;
  }, []);

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView style={styles.global}>
      <View style={styles.top}>
        <Text style={styles.title}>Reptes</Text>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Proverbi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {reptes.map((repte) => (
          <View style={styles.repte}>
            <Image
              style={styles.img}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            ></Image>
            <Text style={styles.titlerepte}>{repte.titol}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontFamily: "UbuntuBold",
  },
  button1: {
    backgroundColor: "white",
    width: "40%",
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
    fontFamily: "Ubuntu",
  },
  grid: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  repte: {
    width: "46%",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: 140,
    borderWidth: 2,
  },
  titlerepte: {
    fontSize: 16,
    fontFamily: "Ubuntu",
    marginTop: 10,
    backgroundColor: "white",
    width: "100%",
    paddingBottom: 10,
    paddingLeft: 10,
  },
});
