import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import HomePage from "./Home";
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
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Repte1 from "./Repte1";
import Home from "./Home";

import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore(appFirebase);

export default function Map({ navigation }) {
  const MAX_DISTANCE = 50;

  const [teamId, setTeamId] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [reptesCompletats, setreptesCompletats] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationmodalVisible, setLocationModalVisible] = useState(false);

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

  // Obtenim teamId
  obtenerValor();

  // Carreguem les dades d l'equip després d'obtenir el teamId
  carregarDadesEquip();

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
        navigation.reset({
          index: 0,
          routes: [{ name: "Inici" }],
        });
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
      const markersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        coordinate: {
          latitude: doc.data().ubicacio.latitude,
          longitude: doc.data().ubicacio.longitude,
        },
        titol: doc.data().titol,
        descripcio: doc.data().descripcio,
      }));
      setMarkers(markersData);
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

    const marker = markers.find((marker) => marker.id === id);
    if (!marker) {
      return;
    }

    const markerLat = marker.coordinate.latitude;
    const markerLon = marker.coordinate.longitude;

    const d = distance(userLat, userLon, markerLat, markerLon);
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

  return (
    <View style={styles.global}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reptes</Text>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Proverbi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.mapcontainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 41.648050980216354,
              longitude: 1.1407925193129018,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            provider="google"
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                pinColor={
                  reptesCompletats && reptesCompletats.includes(marker.id)
                    ? "green"
                    : "red"
                }
              >
                <Callout
                  style={styles.callout}
                  tooltip={true}
                  onPress={() => handleLinkPress(marker.id)}
                >
                  <View>
                    <Text style={styles.markertitle}>{marker.titol}</Text>
                    <Text style={styles.markerdescription}>
                      {marker.descripcio}
                    </Text>
                    <Text style={styles.msgcallout}>
                      Prem aquí per començar la prova
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
      <Modal
        animationType="none"
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "UbuntuBold",
  },
  mapcontainer: {
    width: "100%",
    height: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    overflow: "hidden",
  },
  map: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 40,
    overflow: "hidden",
  },
  markertitle: {
    fontFamily: "UbuntuBold",
  },
  markerdescription: {
    fontFamily: "Ubuntu",
  },
  top: {
    paddingTop: 15,
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
  callout: {
    backgroundColor: "#fff",
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
