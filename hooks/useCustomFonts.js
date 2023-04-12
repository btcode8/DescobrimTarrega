import { useFonts } from "expo-font";

export default useCustomFonts = () => {
  const [loaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuBoldItalic: require("../assets/fonts/Ubuntu-BoldItalic.ttf"),
    UbuntuItalic: require("../assets/fonts/Ubuntu-Italic.ttf"),
    UbuntuLight: require("../assets/fonts/Ubuntu-Light.ttf"),
    UbuntuLightItalic: require("../assets/fonts/Ubuntu-LightItalic.ttf"),
    UbuntuMedium: require("../assets/fonts/Ubuntu-Medium.ttf"),
    UbuntuMediumItalic: require("../assets/fonts/Ubuntu-MediumItalic.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  return loaded;
};
