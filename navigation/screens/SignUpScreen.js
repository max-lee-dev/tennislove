import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import BackIcon from 'react-native-vector-icons/Feather'
import {getFirestore, getDocs, doc, addDoc, setDoc, collection} from "firebase/firestore";
import {auth} from '../../Firebase/firebase';
import {db} from '../../Firebase/firebase';
import {View, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import DropdownComponent from "../../components/DropdownComponent";


function SignupScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [skill, setSkill] = useState('');
    const [selected, setSelected] = useState("");
    const [age, setAge] = useState('');
    const [error, setError] = useState('');


    function onDropdownChange(selected) {
        console.log(selected);
        setSelected(selected);
    }


    const handleFirstName = (text) => {
        setFirstName(text)
    }

    const handleLastName = (text) => {
        setLastName(text)
    }

    const handleEmail = (text) => {
        setEmail(text)
    }

    const handlePassword = (text) => {
        setPassword(text)
    }

    const handleConfirmPassword = (text) => {
        setConfirmPassword(text)
    }

    const handleState = (text) => {
        setState(text)
    }

    const handleCity = (text) => {
        setCity(text)
    }

    function validCredentials() {
        if (firstName === '') {
            setError('Please enter your first name');
            return false;
        } else if (lastName === '') {
            setError('Please enter your last name');
            return false;
        } else if (email === '') {
            setError('Please enter your email');
            return false;
        } else if (password === '' || password.length < 6) {
            setError('Please a valid password');
            return false;
        } else if (password !== confirmPassword) {

            setError('Passwords do not match');
            return false;
        } else if (selected === '') {
            setError('Please select your skill level');
            return false;
        }
        return true;
    }

    async function createUser() {
        if (!validCredentials()) return;

        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            addUserToDB(user.user.uid);
            setError('');
            navigation.navigate('TabNavigator', {screen: 'Home'});
        }).catch((error) => {
            setError(error.message);
        });


    }

    function addUserToDB(uid) {
        const docRef = doc(db, "users", uid);
        setDoc(docRef, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            state: state,
            city: city,
            phoneNumber: phoneNumber,
            skill: skill,
            age: age,
        }).then(() => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.TopView}>
            </View>
            <ScrollView style={styles.BottomView}>
                <BackIcon name={"chevron-left"} size={40} paddingTop={10} color={"#fff"}
                          onPress={() => navigation.navigate('Log In')}/>
                <Text style={styles.Heading}>Create an account</Text>
                <View style={styles.formView}>

                    <TextInput style={styles.textInput} onChangeText={handleFirstName} value={firstName}
                               placeholderTextColor={"#949494"}
                               placeholder="First Name"/>

                    <TextInput style={styles.textInput} onChangeText={handleLastName} value={lastName}
                               placeholderTextColor={"#949494"} placeholder="Last Name"/>

                    <TextInput style={styles.textInput} onChangeText={handleEmail} value={email}
                               placeholderTextColor={"#949494"} type={"email"} placeholder="Email"/>

                    <TextInput style={styles.textInput} onChangeText={handlePassword} value={password}
                               secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Password"/>
                    <TextInput style={styles.textInput} marginBottom={20} onChangeText={handleConfirmPassword}
                               value={confirmPassword}
                               secureTextEntry={true} placeholderTextColor={"#949494"}
                               placeholder="Confirm password"/>

                    <DropdownComponent myfunction={onDropdownChange}/>

                    <Text>{error}</Text>

                    <TouchableOpacity style={styles.Button} onPress={createUser}>
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