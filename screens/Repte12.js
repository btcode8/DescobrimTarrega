import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import useCustomFonts from "../hooks/useCustomFonts";
import YoutubePlayer from "react-native-youtube-iframe";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Repte12 = ({ navigation }) => {
  let text = "";

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView>
      <View style={styles.global}>
        <Text style={styles.title}>Consell comarcal</Text>
        <View style={styles.container}>
          <Text style={styles.text}>
            Acudeix aquí si necessites una pista per passar a la següent prova.
          </Text>
        </View>
        <View style={styles.containerProva}>
          <Text style={styles.title}>Horaris</Text>
          <Text style={styles.text}>Gegants: 10:00 a 20:00</Text>
          <Text style={styles.text}>
            L'Església de Santa Maria de l'Alba: 7:00 a 21:00
          </Text>
          <Text style={styles.text}>
            La resta de proves són accesibles a qualsevol moment del dia.
          </Text>
        </View>
        <Text style={styles.title}>Objectiu</Text>
        <View style={styles.container}>
          <Text style={styles.text}>
            Quan hagis completat totes les proves reclama el teu titol de la
            Gimcana aquí.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Repte12;

const styles = StyleSheet.create({
  global: {
    flex: 1,
    // backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "UbuntuBold",
    marginBottom: 10,
    marginTop: 20,
  },
  // title2: {
  //   fontSize: 20,
  //   textAlign: "left",
  //   fontFamily: "UbuntuBold",
  //   marginVertical: 20,
  // },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  star: {
    fontSize: 20,
    paddingHorizontal: 2,
    color: "black",
  },
  starCompleted: {
    fontSize: 20,
    paddingHorizontal: 2,
    color: "#edb93e",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  containerProva: {
    backgroundColor: "#e6e6e6",
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    marginVertical: 15,
  },
  textProva: {
    fontSize: 22,
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 22,
    padding: 5,
    marginLeft: 10,
    height: 35,
    marginVertical: 5,
    width: "90%",
  },
  button: {
    backgroundColor: "#f24726",
    paddingHorizontal: 85,
    paddingVertical: 15,
    width: "100%",
    marginVertical: 15,
  },
  button2: {
    backgroundColor: "#f67432",
    paddingHorizontal: 85,
    paddingVertical: 15,
    width: "100%",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "UbuntuBold",
    fontSize: 15,
    textAlign: "center",
  },
  textcontainer: {
    width: "60%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Ubuntu",
    marginBottom: 30,
    // marginVertical: 15,
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
  modalButton: {
    backgroundColor: "#f24726",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    height: 40,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imatge: {
    height: 250,
    width: "100%",
    marginVertical: 15,
  },
  inputResponseBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  numbers: {
    width: "5%",
    fontSize: 20,
  },
});
