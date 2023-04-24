import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import useCustomFonts from "../hooks/useCustomFonts";
import YoutubePlayer from "react-native-youtube-iframe";
import { Dimensions } from "react-native";

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

const Repte2 = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [reptesCompletats, setreptesCompletats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    //Ficar aqui el id del equip actual
    const id_equip = "10";
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
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "UbuntuBold",
    marginVertical: 20,
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
  // containerProva: {
  //   flex: 1,
  //   width: "100%",
  //   paddingHorizontal: 25,
  // },
  button: {
    backgroundColor: "#f24726",
    paddingHorizontal: 85,
    paddingVertical: 15,
    width: "100%",
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
    marginVertical: 15,
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
});
