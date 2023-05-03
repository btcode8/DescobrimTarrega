import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Base64 } from "js-base64";
import * as CryptoJS from "crypto-js";
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
  getCountFromServer,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

const RegisterScreen = ({ navigation }) => {
  const [count, setCount] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "equips");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const total = querySnapshot.size;
      setCount(total);
    });
  }, []);

  // Estat inicial
  const [state, setState] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [psswrd, setPsswrd] = useState({
    pass: "",
  });

  // Afegir les dades del formulari al state
  const handleChangeText = (name, value) => {
    if (name === "pass") {
      if (value.toString().length < 6) {
        setState({ ...state, [name]: value });
      } else {
        setPsswrd({ ...state, [name]: value });
        value = CryptoJS.MD5(value).toString();
        setState({ ...state, [name]: value });
      }
    }
    setState({ ...state, [name]: value });
  };

  const saveNewTeam = async () => {
    const docRef = doc(db, "equips", count.toString());
    const emailExists = await checkIfEmailExists(state.email);
    const nameExists = await checkIfTeamExists(state.name);

    if (state.name == "") {
      alert("L'equip ha de tenir un nom");
      return;
    }
    if (nameExists) {
      alert("Ja existeix un equip amb aquest nom");
      return;
    }
    if (!validateEmail(state.email)) {
      alert("El format del correu electrònic no es correcte");
      return;
    }
    if (emailExists) {
      alert("Aquest correu ja està registrat a la base de dades.");
      return;
    }
    if (state.pass.toString().length < 6) {
      alert("La contrasenya ha de tenir com a mínim 6 dígits");
      return;
    }

    const payload = { name: state.name, email: state.email, pass: state.pass };
    await setDoc(docRef, state);

    // Resetejar el formualri
    setState({ ...state, name: "", email: "", pass: "" });
    console.log(state);

    //navigation.navigate('LoginScreen');
  };

  // Comprovar si el correu te el format correcte
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  // Comprovar si el correu ja existeix
  const checkIfEmailExists = async (email) => {
    const q = query(collection(db, "equips"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Comprovar si el nom de l'equip ja existeix
  const checkIfTeamExists = async (name) => {
    const q = query(collection(db, "equips"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  return (
    <ScrollView style={styles.flex_1}>
      <View style={styles.textTop}>
        <Text style={styles.textTop_title}>DESCOBRIM</Text>
        <Text style={styles.textTop_title}>TARREGA</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.form_box}>
          <View style={styles.form_group}>
            <View style={styles.form_groupItem}>
              <Text>Nom del grup</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={(value) => handleChangeText("name", value)}
                value={state.name}
              />
            </View>
          </View>
          <View style={styles.form_group}>
            <View style={styles.form_groupItem}>
              <Text>Email</Text>
              <TextInput
                placeHolder="email"
                style={styles.input_text}
                onChangeText={(value) => handleChangeText("email", value)}
                value={state.email}
              />
            </View>
          </View>
          <View style={styles.form_group}>
            <View style={styles.form_groupItem}>
              <Text>Contrasenya</Text>
              <TextInput
                secureTextEntry={true}
                placeHolder="Contrasenya"
                style={styles.input_text}
                onChangeText={(value) => handleChangeText("pass", value)}
                value={state.psswrd}
              />
            </View>
          </View>
          <View style={styles.form_group}>
            <TouchableOpacity style={styles.button} onPress={saveNewTeam}>
              <Text style={styles.buttonText}>Registrar-se</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.textLeft, styles.form_footerLinks]}>
          <Text style={[styles.color_blue, styles.textMargin_15]}>
            Ja tens compte?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={[styles.color_blue, styles.textMargin_15]}>
              Iniciar sessió
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  //globals
  flex_1: {
    flex: 1,
  },
  textLeft: {
    padding: 15,
  },
  color_blue: {
    color: "#3599C4",
  },
  textMargin_15: {
    marginBottom: 15,
  },
  //Header title
  textTop: {
    marginTop: 80,
    marginBottom: 60,
  },
  textTop_title: {
    flexDirection: "row",
    width: "100%",
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
  },
  //Login form
  form: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white",
    height: "40%",
  },
  form_box: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  form_group: {
    flexDirection: "row",
  },
  form_groupItem: {
    flex: 1,
  },
  input_text: {
    borderColor: "#ACADAD",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 40,
    marginTop: 10,
    height: 30,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#f55d42",
    padding: 15,
    width: "100%",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    //fontFamily: "UbuntuBold",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  form_footerLinks: {
    paddingHorizontal: 25,
  },
});
