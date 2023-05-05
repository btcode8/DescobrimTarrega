import DrawerNavigation from "./components/DrawerNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavigation from "./components/StackNavigation";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
//Importar firestore
import appFirebase from "./database/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(appFirebase);

export default function App() {
  const [userConnectat, setUserConnectat] = useState(null);

  useEffect(() => {
    async function obtenirValor() {
      try {
        const token = await AsyncStorage.getItem("name");

        if (token != null) {
          const collectionRef = collection(db, "equips");

          const q = query(collectionRef, where("name", "==", token));

          getDocs(q)
            .then((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                const docId = querySnapshot.docs[0].id;
                guardarValor(docId);
              } else {
                console.log("No s'ha trobat cap equip.");
              }
            })
            .catch((error) => {
              console.log("Error al buscar el document:", error);
            });
        }

        setUserConnectat(token);
        // console.log(token);
      } catch (error) {
        console.error(error);
      }
    }
    obtenirValor();
  }, []);

  async function guardarValor(docId) {
    try {
      await AsyncStorage.removeItem("teamid");
      let textid = docId.toString();
      await AsyncStorage.setItem("teamid", textid);
    } catch (error) {
      console.error(error);
    }
  }

  return userConnectat ? (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
