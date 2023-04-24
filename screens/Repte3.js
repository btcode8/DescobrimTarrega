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

const Repte3 = () => {
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
          <Text style={styles.text}>Relaciona els punts del mapa amb les parts de l'Adoberia</Text>
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

export default Repte3;

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
