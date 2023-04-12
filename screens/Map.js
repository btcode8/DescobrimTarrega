import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
  onSnapshot,
} from "firebase/firestore";
import Repte1 from "./Repte1";

const db = getFirestore(appFirebase);

export default function Map() {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("No s'han otorgat permisos per accedir a la ubicació");
        return;
      }

      let watchID = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 700,
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

  let text = "Esperant...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function handleLinkPress(id: string) {
    let screenname = "Repte" + id;
    navigation.navigate(Repte1);
  }

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.global}>
      <View style={styles.top}>
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
              <Marker key={marker.id} coordinate={marker.coordinate}>
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
        <Text>Text de prova</Text>
      </View>
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
  title: {
    fontSize: 35,
    fontFamily: "UbuntuBold",
  },
  mapcontainer: {
    width: "100%",
    height: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
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
  // top: {
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
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
});
