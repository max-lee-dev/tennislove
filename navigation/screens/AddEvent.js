import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {auth} from '../../Firebase/firebase';
import {View, TextInput, Text, Button} from 'react-native';

function AddEvent({navigation}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [skill, setSkill] = useState('');
    const [error, setError] = useState('');

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

    const handleAddEvent = () => {

    }


    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <TextInput style={styles.textInput} onChangeText={handleTitle} value={title} placeholder={"Title"}/>
            <TextInput style={styles.descriptionInput} multiline={true} onChangeText={handleDescription}
                       value={description}
                       placeholder={"Description"}/>
            <TextInput style={styles.textInput} onChangeText={handleLocation} value={location}
                       placeholder={"Location"}/>
            <TextInput style={styles.textInput} onChangeText={handleDate} value={date} placeholder={"Date"}/>
            <TextInput style={styles.textInput} onChangeText={handleTime} value={time} placeholder={"Time"}/>
            <TextInput style={styles.textInput} onChangeText={handleSkill} value={skill} placeholder={"Skill"}/>
            <Button title={"Add Event"} onPress={handleAddEvent}/>


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