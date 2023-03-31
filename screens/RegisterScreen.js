import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Base64 } from 'js-base64';
//Importar firestore
import appFirebase from '../database/firebase'; 
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
const db = getFirestore(appFirebase);
//const dbb = getFirestore(app);

const RegisterScreen = () => {
    loadData();
    async function loadData() {
        console.log("hola");
        try {
            const equips = await getDocs(collection(db, "equips"));
            ids = [];
            equips.forEach((doc) => {
                ids.push(doc.id);
                //console.log(doc.id, " => ", doc.data());
            });
            ids.sort();
            ids.forEach((id)=>{
                console.log(id);
            })
        }catch(e){
            console.log(e);
        }
    }

    // Estat inicial
    const [state, setState] = useState({
        name: "",
        email: "",
        pass: "",
    });

    // Afegir les dades del formulari
    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }

    const saveUser = () => {
        console.log(state);
    }
    
    const saveNewTeam = async () => {
        //const teams = collection(db, "equips")
        const docRef = doc(db, "equips", "006");
        const payload = { name: state.name, email: state.email, pass: state.pass };
        await setDoc(docRef, state);

        /*const docRef = await addDoc(collection(db, "equips"), {
            name: state.name,
            email: state.email,
            pass: state.pass
          });*/

        console.log(state);
        /*
        try {
            const collectionRef = doc(db, 'equips');
            const docRef = addDoc(collectionRef, {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        */
        /*if(state.name === ""){
            alert("Introdueix un nom per l'equip");
        } else if(state.email === ""){
            alert("Introdueix un correu correcte");
        } else if (state.pass === "") {
            alert("Introdueix una contrasenya");
        } else {*/
            //try{
                //await firebase.db.collection('equips').add({
                //await addDoc(collection(db, "equips")),{
                    //...state
                    /*name: this.state.name,
                    email: this.state.email,
                    password: this.state.pass*/
                //};
            //}catch{
                //console.error("Algo va malament");
            //}
            
        //}
    }


    const validateEmail = (emailValue) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(emailValue) === false) {
            console.log("Email is Not Correct");
            return false;
        }
        else {
            handleChangeText('email', emailValue);
        }
        /*
        if (reg.test(emailValue) === false) {
            //console.log("Email is Not Correct");
            return false;
        }
        else {
            handleChangeText("email", emailValue);
            console.log("Email is Correct");
            return true;
        }*/
    }

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
                                /*onChangeText={(value) => validateEmail(value)}*/
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
                                /*onChangeText={(value) => handleChangeText("pass", Base64.encode(value))} */
                                onChangeText={(value) => handleChangeText("pass", value)}
                                value={state.pass}
                            /> 
                        </View>
                    </View>
                    <View style={styles.form_group}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={saveNewTeam}>
                            <Text style={styles.buttonText}>Registrar-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.textLeft, styles.form_footerLinks]}>
                    <Text style={[styles.color_blue,styles.textMargin_15]}>Ja tens compte?</Text>
                    <TouchableOpacity>
                        <Text style={[styles.color_blue,styles.textMargin_15]}>Iniciar sessió</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

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
        color: '#3599C4',
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
        paddingHorizontal: 10,
        marginBottom: 40,
        marginTop: 10,
        height: 30
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
        width: '100%',
    },
    form_footerLinks: {
        paddingHorizontal: 25,
    }
});