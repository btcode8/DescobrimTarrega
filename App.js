import DrawerNavigation from "./components/DrawerNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavigation from "./components/StackNavigation";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [userConnectat, setUserConnectat] = useState(null);

  useEffect(() => {
    async function obtenirValor() {
      try {
        const token = await AsyncStorage.getItem("name");
        setUserConnectat(token);
        console.log(token);
      } catch (error) {
        console.error(error);
      }
    }
    obtenirValor();
  }, []);

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
