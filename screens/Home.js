import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore(appFirebase);

const images = {
  repte1: require("../assets/reptes/1.jpg"),
  repte2: require("../assets/reptes/2.jpg"),
  repte3: require("../assets/reptes/3.jpg"),
  repte4: require("../assets/reptes/4.jpg"),
  repte5: require("../assets/reptes/5.jpg"),
  repte6: require("../assets/reptes/6.jpg"),
  repte7: require("../assets/reptes/7.jpg"),
  repte8: require("../assets/reptes/8.jpg"),
  repte9: require("../assets/reptes/9.jpg"),
  repte10: require("../assets/reptes/10.jpg"),
  repte11: require("../assets/reptes/11.jpg"),
  repte12: require("../assets/reptes/12.jpg"),
};

export default function Home({ navigation }) {
  const MAX_DISTANCE = 50;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [reptes, setReptes] = useState([]);
  const [reptesCompletats, setreptesCompletats] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationmodalVisible, setLocationModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK" && navigation.isFocused()) {
        e.preventDefault();
      }
    });

    return unsubscribe;
  }, [navigation]);

  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let watchID = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 0,
        },
        (position) => {
          setLocation(position);
        }
      );
    })();
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "proves");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const reptesData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          coordinate: {
            latitude: doc.data().ubicacio.latitude,
            longitude: doc.data().ubicacio.longitude,
          },
          titol: doc.data().titol,
          descripcio: doc.data().descripcio,
        }))
        .sort((a, b) => a.id - b.id);
      setReptes(reptesData);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    //Ficar aqui el id del equip actual
    const id_equip = "8";
    const docRef = doc(db, "equips", id_equip);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const currentTeamData = docSnap.data();
      if (currentTeamData) {
        setCurrentTeam(currentTeamData);
        const provesCompletades = currentTeamData.proves;
        setreptesCompletats(provesCompletades);
      }
    });

    return unsubscribe;
  }, []);

  function handleLinkPress(id: string) {
    if (!location) {
      setModalVisible(true);
      return;
    }

    const userLat = location.coords.latitude;
    const userLon = location.coords.longitude;

    const repte = reptes.find((repte) => repte.id === id);
    if (!repte) {
      return;
    }

    const repteLat = repte.coordinate.latitude;
    const repteLon = repte.coordinate.longitude;

    const d = distance(userLat, userLon, repteLat, repteLon);
    if (d > MAX_DISTANCE) {
      setLocationModalVisible(true);
      return;
    }

    if (typeof reptesCompletats === "undefined") {
      if (id == 1) {
        let screenname = "Repte" + id;
        navigation.navigate(screenname);
      } else {
        setModalVisible(true);
      }
    } else {
      if (reptesCompletats.includes("1") || id == 1) {
        let screenname = "Repte" + id;
        navigation.navigate(screenname);
      } else {
        setModalVisible(true);
      }
    }
  }

  function closeModal() {
    setModalVisible(false);
  }

  function closeLocationModal() {
    setLocationModalVisible(false);
  }

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  async function obtenirValor() {
    try {
      let name = await AsyncStorage.getItem("name");
      console.log(name);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.global}>
      <View style={styles.top}>
        <Text style={styles.title}>Reptes</Text>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Proverbi</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {reptes.map((repte) => {
          return (
            <TouchableOpacity
              key={repte.id}
              style={styles.repte}
              onPress={() => handleLinkPress(repte.id)}
            >
              <Image style={styles.img} source={images[`repte${repte.id}`]} />

              <Text style={styles.titlerepte}>{repte.descripcio}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Heu de començar el recorregut des del Museu Comarcal per fer
              aquesta prova.
            </Text>
            <Button title="Tancar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={locationmodalVisible}
        onRequestClose={closeLocationModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Us heu d'apropar a la ubicació per participar en aquesta prova.
            </Text>
            <Button title="Tancar" onPress={closeLocationModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    overflow: "hidden",
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
