import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";

import { globalStyles } from "../styles/globalStyles";


const LoginScreen = () => {
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
                            <TextInput placeHolder="email" style={styles.input_text}/>
                        </View>
                    </View>
                    <View style={styles.form_group}>
                        <View style={styles.form_groupItem}>
                            <Text>Contrasenya</Text>
                            <TextInput secureTextEntry={true} placeHolder="Contrasenya" style={styles.input_text} /> 
                        </View>
                    </View>
                    <View style={styles.form_group}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Iniciar sessió</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.textLeft, styles.form_footerLinks]}>
                    <TouchableOpacity>
                        <Text style={[styles.color_blue,styles.textMargin_15]}>Has oblidat la contrasenya?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.color_blue,styles.textMargin_15]}>Registrar-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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
        color: '#3599C4',
    },
    textMargin_15: {
        marginBottom: 15,
    },
    //Header title
    textTop: {
        marginTop: 80,
    },
    textTop_title: {
        flexDirection: 'row',
        width: '100%',
        fontSize: 40,
        fontWeight: '800',
        textAlign: 'center',
    },
    //Login form
    form: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '40%',
    },
    form_box: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    form_group: {
        flexDirection: 'row',
    },
    form_groupItem: {
        flex: 1,
    },
    input_text: {
        borderColor: '#ACADAD',
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 40,
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: "#f55d42",
        padding: 15,
        width: '100%',
        textAlign: 'center',
    },
    buttonText: {
        color: "#fff",
        //fontFamily: "UbuntuBold",
        fontSize: 18,
        textAlign: 'center',
    },
    form_footerLinks: {
        paddingHorizontal: 25,
    }
});

