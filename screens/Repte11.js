//video: zWUr0UZnqVg
//video 2 part: nSWyQeg2NXo
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
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore(appFirebase);

const Repte8 = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [reptesCompletats, setreptesCompletats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
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

  let text1 = "";
  let text2 = "";
  let text3 = "";
  let text4 = "";

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  const stars = [];
  for (let i = 0; i < 10; i++) {
    if (i < reptesCompletats.length) {
      stars.push(
        <Icon
          key={i}
          style={styles.starCompleted}
          name="star"
          size={30}
          color="black"
        />
      );
    } else {
      stars.push(
        <Icon key={i} style={styles.star} name="star" size={30} color="black" />
      );
    }
  }

  function closeModal() {
    setModalVisible(false);
  }
  function closeModalAlert() {
    setModalAlertVisible(false);
  }

  function handleEnviar() {
    if (
      text1 == 4 &&
      text2 == 2 &&
      text3 == 10 &&
      text4.toLowerCase().trim() == "josep minguell"
    ) {
      const docRef = doc(db, "equips", teamId);
      updateDoc(docRef, {
        proves: arrayUnion("11"),
      })
        .then(() => {
          navigation.navigate("Inici");
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log("Correcte");
    } else {
      setModalAlertVisible(true);
      console.log("NO");
    }
  }

  return (
    <ScrollView>
      <View style={styles.global}>
        <View style={styles.container}>
          <View style={styles.header}>{stars}</View>
          <Text style={styles.title}>Plaça major</Text>
          <YoutubePlayer
            style={styles.video}
            height={230}
            width={Dimensions.get("window").width * 0.9}
            play={playing}
            videoId={"zWUr0UZnqVg"}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Més informació</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            Mira amb atenció tots els detalls de l'església i respon les
            següents preguntes:
          </Text>
          <View style={styles.containerProva}>
            <Text style={styles.text}>
              1. Quants àngels acompanyen a la Verge de l'Alba?
            </Text>
            <View style={styles.inputResponseBox}>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  text1 = value;
                }}
              ></TextInput>
            </View>
            <Text style={styles.text}>
              2. Quantes espines hi ha la corona de la capella de les Santes
              Espines?
            </Text>
            <View style={styles.inputResponseBox}>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  text2 = value;
                }}
              ></TextInput>
            </View>
            <Text style={styles.text}>
              3. Quants balcons hi ha en tota l'església?
            </Text>
            <View style={styles.inputResponseBox}>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  text3 = value;
                }}
              ></TextInput>
            </View>
            <Text style={styles.text}>
              4. Qui va pintar els frescos interiors de l'església?
            </Text>
            <View style={styles.inputResponseBox}>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  text4 = value;
                }}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => handleEnviar()}
          >
            <Text style={styles.buttonText}>Enviar resposta</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Informació</Text>
              <Text style={styles.modalText}>
                L'Església de Santa Maria de l'Alba és una obra de Tàrrega
                (Urgell) protegida com a bé cultural d'interès nacional. Fou
                erigida entre 1672 i 1742, tot cenyint-se al disseny realitzat
                prèviament per l'arquitecte Josep de la Concepció, el qual fou
                altament influenciat pels corrents neoclàssics propis del
                context en què visqué.
              </Text>
              <TextInput></TextInput>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Tancar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAlertVisible}
          onRequestClose={closeModalAlert}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Resposta incorrecta</Text>
              <Text style={styles.modalText}>
                Revisa les teves respostes, n'hi ha alguna que no és correcta.
              </Text>
              <TextInput></TextInput>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeModalAlert}
              >
                <Text style={styles.modalButtonText}>Tancar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Repte8;

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
    alignItems: "center",
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
