import { StyleSheet, Dimensions } from 'react-native';
import { useFonts } from "expo-font";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/*const [loaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuBoldItalic: require("../assets/fonts/Ubuntu-BoldItalic.ttf"),
    UbuntuItalic: require("../assets/fonts/Ubuntu-Italic.ttf"),
    UbuntuLight: require("../assets/fonts/Ubuntu-Light.ttf"),
    UbuntuLightItalic: require("../assets/fonts/Ubuntu-LightItalic.ttf"),
    UbuntuMedium: require("../assets/fonts/Ubuntu-Medium.ttf"),
    UbuntuMediumItalic: require("../assets/fonts/Ubuntu-MediumItalic.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu-Regular.ttf"),
  });*/

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        //fontFamily: "UbuntuBold",
    },
    welcome_image: {
        marginTop: 50,
        width: windowWidth * 0.7,
        height: windowWidth * 0.7 * (1024 / 1024),
        resizeMode: 'cover',
    },
    text: {
        paddingHorizontal: 45,
        fontSize: 23,
        marginTop: 50,
        textAlign: "center",
        color: "#595959",
        //fontFamily: "Ubuntu",
    },
    primary_button: {
        backgroundColor: "#f55d42",
        padding: 10,
        marginTop: 50,
        paddingHorizontal: 85,
        paddingVertical: 15,
    },
    buttonText: {
        color: "#fff",
        //fontFamily: "UbuntuBold",
        fontSize: 15,
    },

});
