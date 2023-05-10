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

const Repte3 = ({ navigation }) => {
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
  let text5 = "";
  let text6 = "";
  let text7 = "";
  let text8 = "";
  let text9 = "";

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
      text1.toLowerCase().includes("remull")  &&
      text2.toLowerCase().includes("calciners") &&
      text3.toLowerCase().includes("adob")  &&
      text4.toLowerCase().includes("tenyit") &&
      text5.toLowerCase().includes("treball") &&
      text6.toLowerCase().includes("magatzem") &&
      text7.toLowerCase().includes("pou") &&
      text8.toLowerCase().includes("entrada") &&
      text9.toLowerCase().includes("desguas")
    ) {
      const docRef = doc(db, "equips", teamId);
      updateDoc(docRef, {
        proves: arrayUnion("3"),
      })
        .then(() => {
          navigation.navigate("Inici");
        })
        .catch((error) => {
          console.log(error.message);
        });
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
          <Text style={styles.title}>Adoberia Molí del Codina</Text>
          <YoutubePlayer
            style={styles.video}
            height={230}
            width={Dimensions.get("window").width * 0.9}
            play={playing}
            videoId={"ILRWYbFwzLo"}
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
            Relaciona els punts del mapa amb les parts de l'Adoberia:
          </Text>
          <Image
            source={require("../assets/reptes/adoberia.jpeg")}
            style={styles.imatge}
          />
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>1</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text1 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>2</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text2 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>3</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text3 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>4</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text4 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>5</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text5 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>6</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text6 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>7</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text7 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>8</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text8 = value;
              }}
            ></TextInput>
          </View>
          <View style={styles.inputResponseBox}>
            <Text style={styles.numbers}>9</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text9 = value;
              }}
            ></TextInput>
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
                Aquest complex pre-industrial, dels segles XV a primera meitat
                del XVII, estaria reaprofitant un edifici ja existent al segle
                XIV, situat a prop del riu Ondara. L'excavació de l'indret,
                conegut com “Molí del Codina” va posar al descobert estructures
                relacionades amb la conducció de les aigües i diverses piques de
                pedra, de diferents mides i formes, que intervenien en el procés
                d'adobatge i de transformació de les pells, com són la del
                remull, les dels calciners i l'alum, les de l'adob i les del
                tenyit. L'indret va partir la riuada del 17 de setembre de 1644
                que cobrí l'adoberia de llots i la inutilitzà. L'Adoberia de
                Tàrrega forma part de la Xarxa d'Adoberies Històriques de
                Catalunya.
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
              <TouchableOpacity style={styles.modalButton} onPress={closeModalAlert}>
                <Text style={styles.modalButtonText}>Tancar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Repte3;

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
    textAlign: "justify"
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
