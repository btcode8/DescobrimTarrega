import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as CryptoJS from "crypto-js";
import { AuthContext } from "../components/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

//Importar firestore
import appFirebase from "../database/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  getCountFromServer,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

import { globalStyles } from "../styles/globalStyles";
import DrawerNavigation from "../components/DrawerNavigation";
import StartScreen from "./StartScreen";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      const currentRouteName =
        navigation.getState().routeNames[navigation.getState().index];
      if (
        currentRouteName === "Inici" || "Welcome" && 
        e.data.action.type === "GO_BACK" &&
        navigation.isFocused()
      ) {
        e.preventDefault();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const [state, setState] = useState({
    email: "",
    pass: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  // Comprovar si el correu ja existeix
  const checkIfEmailExists = async (email) => {
    const q = query(collection(db, "equips"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  async function login() {
    const emailExists = await checkIfEmailExists(state.email);

    if (!emailExists) {
      alert("Aquest correu no existeix a la base de dades");
    } else {
      // Comprovar usuari y pass
      const q = query(
        collection(db, "equips"),
        where("email", "==", state.email),
        where("pass", "==", state.pass)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Usuari o contrasenya incorrectes");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      console.log(userData);

      if (userData.pass === state.pass.toString()) {
        // Contraseña correcta, actualizar el estado de autenticación del usuario
        //const { setUser } = useContext(AuthContext);
        //setUser(userDoc.id);
        guardarValor(userData);
        //obtenirValor();
        // Contraseña correcta, devolver el ID del usuario
        console.log("Usuario connectat amb èxit!");
        //return <DrawerNavigation />;
        //return userDoc.id;
        navigation.navigate("Start");
      } else {
        console.log("Contrasenya incorrecta");
        return;
      }
    }
  }

  async function guardarValor(userData) {
    try {
      await AsyncStorage.removeItem("name");
      await AsyncStorage.setItem("name", userData.name);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.flex_1}>
      <View style={styles.textTop}>
        <Text style={styles.textTop_title}>DESCOBRIM</Text>
        <Text style={styles.textTop_title}>TARREGA</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.form_box}>
          <View style={styles.form_group}>
            <View style={styles.form_groupItem}>
              <Text>Email</Text>
              <TextInput
                placeHolder="email"
                style={styles.input_text}
                onChangeText={(value) => handleChangeText("email", value)}
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
                onChangeText={(value) =>
                  handleChangeText("pass", CryptoJS.MD5(value).toString())
                }
              />
            </View>
          </View>
          <View style={styles.form_group}>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Iniciar sessió</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.textLeft, styles.form_footerLinks]}>
          <TouchableOpacity>
            <Text style={[styles.color_blue, styles.textMargin_15]}>
              Has oblidat la contrasenya?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={[styles.color_blue, styles.textMargin_15]}>
              Registrar-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
    marginTop: 10,
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
  },
  form_footerLinks: {
    paddingHorizontal: 25,
  },
});
