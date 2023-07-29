import React, {useState, useEffect} from 'react';
import {auth} from '../../Firebase/firebase';
import {View, ScrollView, Text, Button, RefreshControl, SafeAreaView} from 'react-native';
import {StyleSheet} from "react-native";
import {useFocusEffect} from '@react-navigation/native';
import Event from '../../components/Event';

import {getFirestore, getDocs, doc, addDoc, setDoc, collection, where, query, orderBy} from "firebase/firestore";


import {db} from '../../Firebase/firebase';

function HomeScreen({navigation}) {
    const [refreshing, setRefreshing] = useState(false);
    const [time, setTime] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [createdWhen, setCreatedWhen] = useState([]);
    const [description, setDescription] = useState([]);
    const [location, setLocation] = useState([]);
    const [title, setTitle] = useState([]);
    const [creator, setCreator] = useState([]);
    const [skill, setSkill] = useState([]);
    const [date, setDate] = useState([]);
    const [peopleNeeded, setPeopleNeeded] = useState([]);
    const [creatorUID, setCreatorUID] = useState([]);
    const [roomExists, setRoomExists] = useState(false);


    useEffect(() => {
        console.log('test')
        if (!auth.currentUser) {
            navigation.navigate('Log In');
        }
        getEvents();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getEvents();
        setRefreshing(false);
    }, [refreshing]);


    const getEvents = async () => {
        let tempTime = [];
        let tempAttendees = [];
        let tempDescription = [];
        let tempLocation = [];
        let tempTitle = [];
        let tempCreator = [];
        let tempCreatedWhen = [];
        let tempSkill = [];
        let tempDate = [];
        let tempPeopleNeeded = [];
        let tempCreatorUID = [];

        const eventCollectionRef = collection(db, "events");
        const sort = query(eventCollectionRef, orderBy("time", "desc"));
        const recentsnapshot = await getDocs(sort);

        recentsnapshot.forEach((doc) => {
            tempTime.push(doc.data().time);
            tempAttendees.push(doc.data().attendees);
            tempDescription.push(doc.data().description);
            tempLocation.push(doc.data().location);
            tempTitle.push(doc.data().title);
            tempCreator.push(doc.data().creator);
            tempSkill.push(doc.data().skill);
            tempPeopleNeeded.push(doc.data().peopleNeeded);
            tempCreatorUID.push(doc.data().creatorUID);
            let seconds = doc.data().date.seconds;
            let date = new Date(seconds * 1000);
            let dateString = date.toLocaleDateString();
            tempDate.push(dateString);


            if (doc.data().createdWhen) {
                let createdString = doc.data().createdWhen;

                let createdDate = new Date(createdString);
                let createdDateString = createdDate.toLocaleDateString();
                tempCreatedWhen.push(createdDateString);
            }


        });

        setTime(tempTime);
        setAttendees(tempAttendees);
        setDescription(tempDescription);
        setLocation(tempLocation);
        setTitle(tempTitle);
        setCreator(tempCreator);
        setCreatedWhen(tempCreatedWhen);
        setSkill(tempSkill);
        setPeopleNeeded(tempPeopleNeeded);
        setCreatorUID(tempCreatorUID);

        setDate(tempDate);
        console.log(tempPeopleNeeded);
    }

    return (
        <SafeAreaView>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />

                }
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>

                {time.map((item, index) => (
                    <View style={styles.container} key={index}>
                        <Event
                            navigation={navigation}
                            title={title[index]} createdAt={createdWhen[index]}
                            creator={creator[index]}
                            description={description[index]}
                            location={location[index]}
                            skill={skill[index]}
                            date={date[index]}
                            time={time[index]}
                            attendees={attendees[index]}
                            peopleNeeded={peopleNeeded[index]}
                            creatorUID={creatorUID[index]}

                        />
                    </View>


                ))}


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        contentContainerStyle: {
            alignItems: 'flex-start',
        },


    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})

export default HomeScreen;