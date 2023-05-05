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

const Repte2 = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [reptesCompletats, setreptesCompletats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [teamId, setTeamId] = useState([]);

  useEffect(() => {
    async function obtenirValor() {
      try {
        const token = await AsyncStorage.getItem("teamid");

        setTeamId(token);
        // console.log(token);
      } catch (error) {
        console.error(error);
      }
    }
    obtenirValor();
  }, []);

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

  useEffect(() => {
    const id_equip = teamId;
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

  function closeModal2() {
    setModal2Visible(false);
  }

  function handleEnviar() {
    if (
      text1.trim() == "respirar" &&
      text2.trim() == "veu" &&
      text3.trim() == "seques" &&
      text4.trim() == "somnien" &&
      text5.trim() == "poema" &&
      text6.trim() == "llegit" &&
      text7.trim() == "carrer" &&
      text8.trim() == "tu"
    ) {
      const docRef = doc(db, "equips", teamId);
      updateDoc(docRef, {
        proves: arrayUnion("2"),
      })
        .then(() => {
          navigation.navigate("Inici");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      console.log("NO");
    }
  }

  return (
    <ScrollView>
      <View style={styles.global}>
        <View style={styles.container}>
          <View style={styles.header}>{stars}</View>
          <Text style={styles.title}>Plaça de Sant Antoni</Text>
          <YoutubePlayer
            style={styles.video}
            height={230}
            width={Dimensions.get("window").width * 0.9}
            play={playing}
            videoId={"L9Ofc0JIBh0"}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Més informació</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>A) Biblioteca</Text>
          <Text style={styles.text}>
            Omple els buits del poema que hi ha a la façana de la biblioteca.
          </Text>
          <View style={styles.containerProva}>
            <Text style={styles.textProva}>Escolto el</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text1 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>
              de l'aire i em dono al vent; ja sense
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text2 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>
              , com un de tants seré cançó. En el trepig de fulles
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text3 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>, sento que l'arbre diu: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text4 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>
              les arrels encara. La vida és un senzill donar-se com un
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text5 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>
              escrit, anònim, que vol la llum d'uns ulls per ser
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text6 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>
              una i altra vegada. Amic, si en el
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text7 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}>
              no et dic adéu, pensa que sóc un de tants, un
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                text8 = text;
              }}
            ></TextInput>
            <Text style={styles.textProva}> mateix, que ja només estimo.</Text>
          </View>
          <Image
            style={styles.imatge}
            source={require("../assets/reptes/1_2.jpg")}
          />
          <Text style={styles.title}>B) Mesura</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModal2Visible(true)}
          >
            <Text style={styles.buttonText}>Més informació</Text>
          </TouchableOpacity>
          <Text style={styles.textProva}>
            Mesura l'alçada de fins on va arribar l'aigua de la rubinada al
            carrer de Sant Agustí.
          </Text>
          <View style={styles.containerProva}>
            <Text style={styles.text}>Escriu la resposta</Text>
            <TextInput style={styles.textInput}></TextInput>
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
          visible={modal2Visible}
          onRequestClose={closeModal2}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Informació</Text>
              <Text style={styles.modalText}>
                La matinada del 23 de setembre de 1874 (dia de Santa Tecla) es
                va produir el catastròfic aiguat, conegut amb el nom popular de
                l'Aiguat de Santa Tecla o Rubinada de Santa Tecla, que va
                afectar gairebé tot Catalunya provocant el desbordament violent
                de nombrosos rius i rieres de la meitat sud del país. La
                violenta crescuda de l'Ondara a la vila de Tàrrega va arrossegar
                tot el raval de Sant Agustí causant 150 víctimes mortals i
                l'esfondrament de 250 cases.
              </Text>
              <TextInput></TextInput>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeModal2}
              >
                <Text style={styles.modalButtonText}>Tancar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
                La plaça més antiga de Tàrrega ja apareix esmentada a finals del
                segle XI encara que llavors amb el nom de plaça de Sant Mateu.
                En un primer moment era una placeta de mides més reduïdes i un
                lloc molt transitat, ja que estava situada a la vora d'un portal
                de la muralla per on passava el Camí Ral. Però la placeta aviat
                va quedar petita i, el 1319, diversos prohoms de la vila van
                demanar permís al rei Jaume II per fer-ne una ampliació. Amb la
                reforma, l'espai va adquirir l'aspecte de plaça porxada que ha
                mantingut fins als nostres dies, tot i que amb algunes
                modificacions i reformes. Paral·lelament, en la mateixa època,
                s'hi va construir l'hospital i l'església de Sant Antoni, que
                van donar el nou nom a la plaça.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Tancar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Repte2;

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
    height: 230,
    width: "100%",
    marginVertical: 15,
  },
});
