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
import { db } from "../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import { ref, onValue, push, update, remove, set } from "firebase/database";
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';

export default function Map() {
  const navigation = useNavigation();

  function handleLinkPress() {
    console.log("Altra pantalla");
  }

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    return onValue(ref(db, "/ubicacions"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let ubicacionsItems = { ...data };
      console.log(ubicacionsItems);
      setTodos(ubicacionsItems);
    });
  }, []);

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

  let text = "Esperant...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.global}>
      <View style={styles.top}>
        <Text style={styles.title}>Reptes</Text>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText1}>Botó 1</Text>
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
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              ></Marker>
            )}
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
  },
});
