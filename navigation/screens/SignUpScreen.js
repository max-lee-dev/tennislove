import * as React from 'react';

import {StyleSheet} from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather'

import {View, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';

function SignupScreen({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.TopView}>
            </View>
            <ScrollView style={styles.BottomView}>
                <BackIcon name={"chevron-left"} size={40} paddingTop={10} color={"#fff"}
                          onPress={() => navigation.navigate('Log In')}/>
                <Text style={styles.Heading}>Create an account</Text>
                <View style={styles.formView}>

                    <TextInput style={styles.textInput} placeholderTextColor={"#949494"} placeholder="Email"/>

                    <TextInput style={styles.textInput} secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Password"/>
                    <TextInput style={styles.textInput} secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Confirm password"/>
                    <TextInput style={styles.textInput} secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Location"/>
                    <TextInput style={styles.textInput} secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Skill level"/>
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.ButtonText}> Create account</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'


    },
    TopView: {
        width: "100%",
        height: "30%",
    },
    BottomView: {
        width: "100%",
        height: "70%",
        backgroundColor: '#1f1f1f',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    Heading: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 30,
    },
    textInput: {
        height: 50,
        width: "80%",
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        color: "#fff",

        marginTop: 20,

        paddingLeft: 20,
        fontSize: 20,

    },
    formView: {
        width: "100%",
        height: "60%",
        backgroundColor: '#1f1f1f',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    Button: {
        width: "80%",
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default SignupScreen;