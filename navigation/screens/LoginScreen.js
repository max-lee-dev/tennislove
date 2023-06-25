import * as React from 'react';

import {StyleSheet} from 'react-native';

import {View, Text, TextInput, TouchableOpacity} from 'react-native';

function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.TopView}>
            </View>
            <View style={styles.BottomView}>
                <Text style={styles.Heading}>Welcome back</Text>
                <View style={styles.formView}>
                    <TextInput style={styles.textInput} placeholderTextColor={"#949494"} placeholder="Email"/>
                    <TextInput style={styles.textInput} secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Password"/>
                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.ButtonText}> Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={styles.ButtonText}> Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        height: "40%",
    },
    BottomView: {
        width: "100%",
        height: "60%",
        backgroundColor: '#1f1f1f',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    Heading: {
        color: "#ececec",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 40,
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

export default LoginScreen;