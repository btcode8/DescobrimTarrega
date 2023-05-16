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

const Repte4 = ({ navigation }) => {
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

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const loaded = useCustomFonts();

  if (!loaded) {
    return null;
  }

  const stars = [];
  for (let i = 0; i < 10; i++) {
    if (i < reptesCompletats.length - 1) {
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
      text1.toLowerCase().includes("alba") &&
      text2.toLowerCase().includes("eloi") &&
      text3.toLowerCase().includes("violant") &&
      text4.toLowerCase().includes("jaume") &&
      text5.toLowerCase().includes("almodis") &&
      text6.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes("ramon") &&
      text7.toLowerCase().includes("pubilla") &&
      text8.toLowerCase().includes("hereu")
    ) {
      const docRef = doc(db, "equips", teamId);
      updateDoc(docRef, {
        proves: arrayUnion("4"),
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
          <Text style={styles.title}>Gegants</Text>
          <YoutubePlayer
            style={styles.video}
            height={230}
            width={Dimensions.get("window").width * 0.9}
            play={playing}
            videoId={"WpUdQhni3BE"}
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
            Mira les parelles de gegants i relaciona-les amb el seu nom. Pots
            trobar informació a les plaques de la vitrina o la web guixanet.cat.
          </Text>
          <Text style={styles.textGegant}>
            Primera parella
          </Text>
          <Image
            source={require("../assets/reptes/gegants/eloi-alba_268x168.jpeg")}
            style={styles.imatge}
          />
          <View style={styles.inputResponseBox}>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text1 = value;
              }}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text2 = value;
              }}
            ></TextInput>
          </View>
          <Text style={styles.textGegant}>
            Segona parella
          </Text>
          <Image
            source={require("../assets/reptes/gegants/jaume-violant_268x168.jpeg")}
            style={styles.imatge}
          />
          <View style={styles.inputResponseBox}>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text3 = value;
              }}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text4 = value;
              }}
            ></TextInput>
          </View>
          <Text style={styles.textGegant}>
            Tercera parella
          </Text>
          <Image
            source={require("../assets/reptes/gegants/ramon-almodis_268x168.jpeg")}
            style={styles.imatge}
          />
          <View style={styles.inputResponseBox}>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text5 = value;
              }}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text6 = value;
              }}
            ></TextInput>
          </View>
          <Text style={styles.textGegant}>
            Cuarta parella
          </Text>
          <Image
            source={require("../assets/reptes/gegants/hereu-pubilla_268x168.jpg")}
            style={styles.imatge}
          />
          <View style={styles.inputResponseBox}>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text7 = value;
              }}
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => {
                text8 = value;
              }}
            ></TextInput>
          </View>
        </View>
        <View style={styles.container}>
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
                Els Gegants de Tàrrega amenitzen les diferents festes de la
                nostra ciutat, per exemple: la Festa Major de Maig, les Festes
                de Sant Eloi, Corpus, les festes dels barris històrics…
                Actualment es guarden en aquest expositor amb els capgrossos de
                la ciutat. Podeu trobar més informació sobre cada element a
                guixanet.cat.
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

export default Repte4;

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
  inputResponseBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 22,
    padding: 5,
    //marginLeft: 10,
    height: 35,
    marginVertical: 5,
    width: "48%",
  },
  textInputLeft: {
    flex: 1,
    width: "50%"
  },
  textInputRight: {
    flex: 2,
    width: "50%"
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
    marginBottom: 45
    // marginVertical: 15,
  },
  textGegant: {
    fontSize: 21,
    fontWeight: "bold",
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
    height: 175,
    width: "100%",
    marginVertical: 15,
  },
});
