import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {auth, db} from '../../Firebase/firebase';
import {View, TextInput, Text, Button, ScrollView} from 'react-native';
import GooglePlacesInput from "../../components/GooglePlacesInput";
import DatePicker from '../../components/DatePicker'
import {getFirestore, getDocs, doc, addDoc, setDoc, collection, query, where, onSnapshot} from "firebase/firestore";
import TimePicker from '../../components/TimePicker'
import DropdownComponent from "../../components/DropdownComponent";
import PeopleDropdown from "../../components/PeopleDropdown";

function AddEvent({navigation}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [skill, setSkill] = useState('');
    const [error, setError] = useState('');
    const [peopleNeeded, setPeopleNeeded] = useState('');
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {

        const userCollectionRef = collection(db, "users");
        const q = query(userCollectionRef, where("uid", "==", auth.currentUser.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserInfo(doc.data());
            });
        });
        return unsub;

    }, []);


    const handleTitle = (text) => {
        setTitle(text)
    }

    const handleDescription = (text) => {
        setDescription(text)
    }

    const handleLocation = (text) => {
        setLocation(text)
    }


    const handleDate = (text) => {
        setDate(text)
    }

    const handleTime = (text) => {
        setTime(text)
    }

    const handleSkill = (text) => {
        setSkill(text)
    }

    const handlePeopleNeeded = (text) => {
        setPeopleNeeded(text)
    }


    const handleAddEvent = () => {
        if (title === '' || description === '' || location === '' || time === '' || skill === '' || peopleNeeded === '') {
            setError("Please fill out all fields")
        } else {
            setError("")
            addEvent()
        }


    }

    const addEvent = async () => {
        const docRef = await addDoc(collection(db, "events"), {
            title: title,
            description: description,
            location: location,
            date: date,
            time: time,
            skill: skill,
            attendees: [],
            createdWhen: new Date().toDateString(),
            peopleNeeded: peopleNeeded,
            creator: auth.currentUser.displayName,
            creatorPFP: userInfo.pfp,
            creatorUID: auth.currentUser.uid
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);

            navigation.navigate('Feed Stack', {screen: 'Home'})
        });

    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <TextInput style={styles.textInput} onChangeText={handleTitle} value={title} placeholder={"Title"}/>
            <TextInput style={styles.descriptionInput} multiline={true} onChangeText={handleDescription}
                       value={description}
                       placeholder={"Description"}/>
            <TextInput style={styles.textInput} onChangeText={handleLocation} value={location}
                       placeholder={"Location"}/>
            <View style={{width: '80%', display: 'flex', flexDirection: 'row', justifyContent: "space-evenly"}}>
                <DatePicker changeDate={handleDate}/>
                <TimePicker changeTime={handleTime}/>
            </View>
            <View style={{marginTop: 20, width: '100%', flex: 1, alignItems: 'center'}}>
                <DropdownComponent myfunction={handleSkill}/>
            </View>
            <PeopleDropdown changePeople={handlePeopleNeeded}/>

            <Button title={"Add Event"} onPress={handleAddEvent}/>
            <Text>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        paddingLeft: 20,
        marginTop: 20,

        height: 50,
        width: "80%",
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        color: "#000",

    },
    descriptionInput: {


        textAlignVertical: 'top',
        paddingTop: 10,
        paddingRight: 20,
        fontSize: 18,
        paddingLeft: 20,
        marginTop: 20,
        height: 100,
        width: "80%",
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 1,
        color: "#000",

    }
})


export default AddEvent;