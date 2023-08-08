import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View, TextInput, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import blankpfp from '../assets/blankpfp.png';
import {auth, db} from '../Firebase/firebase';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    useFonts,
    LexendDeca_100Thin,
    LexendDeca_200ExtraLight,
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_800ExtraBold,
    LexendDeca_900Black,
} from "@expo-google-fonts/lexend-deca";
import {addDoc, collection, query, where, onSnapshot} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";


function Event({
                   navigation,
                   title,
                   createdAt,
                   description,
                   location,
                   date,
                   time,
                   skill,
                   creator,
                   peopleNeeded,
                   creatorUID,
                   creatorPfp,
               }) {
    let [fontsLoaded] = useFonts({
        LexendDeca_100Thin,
        LexendDeca_200ExtraLight,
        LexendDeca_300Light,
        LexendDeca_400Regular,
        LexendDeca_500Medium,
        LexendDeca_600SemiBold,
        LexendDeca_700Bold,
        LexendDeca_800ExtraBold,
        LexendDeca_900Black,
    });
    const strippedDate = date?.substring(0, date.length - 5)
    if (!fontsLoaded) {
        return <Text> Loading... </Text>

    }

    const chatroomRef = collection(db, "chatrooms");
    const myChatRooms = query(chatroomRef, where("users", "array-contains", auth.currentUser.uid));

    async function sendRequest() {
        console.log('send request')

        const uids = [auth.currentUser.uid, creatorUID];
        const sortedID = uids.sort().join('');

        const newChatroom = {
            users: [auth.currentUser.uid, creatorUID],
            messages: [],
            createdAt: new Date(),
            roomID: sortedID
        }

        let loading = true;
        let hasSingleChatroom = true;
        let exists = false;
        console.log('Should be 1')

        await onSnapshot(myChatRooms, (querySnapshot) => {
            console.log('Should be 2')

            querySnapshot.forEach((doc) => {
                if (doc.data().roomID === sortedID) {
                    console.log("chatroom exists, go to chatroom")
                    navigation?.navigate('Chat Hub Stack', {
                        screen: 'ChatScreen',
                        params: {
                            roomID: sortedID,
                            pretext: "Hey! I'm interested in your " + location + " event on " + strippedDate + " at " + time + "!"
                        }
                    });
                    exists = true;
                }
            });
            console.log('Should be 3')
            if (!exists) {
                console.log("Should be 4: " + exists, loading, hasSingleChatroom)

                console.log("chatroom doesnt exist yet, add")
                addDoc(chatroomRef, newChatroom).then((docRef) => {
                    console.log("Document written with ID WTF: ", docRef.id);
                    navigation.navigate('Chat Hub Stack', {
                        screen: "ChatScreen",
                        params: {roomID: auth.currentUser.uid + creatorUID}
                    })


                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });

            }
        });


    }

    return (
        <View style={styles.eventContainer}>
            <View style={styles.HStack}>

                <View>
                    <TouchableOpacity style={styles.topLeftView}
                                      onPress={() => navigation.navigate('Profile', {userID: creatorUID})}>

                        <View style={{marginRight: 5, marginLeft: 0}}>

                            {!creatorPfp &&
                                <Image source={blankpfp} style={{
                                    width: 40, height: 40, marginTop: 5,
                                    marginRight: 5, borderRadius: 50
                                }}/>}
                            {creatorPfp &&
                                <Image source={{uri: creatorPfp}}
                                       style={{
                                           width: 40,
                                           height: 40,
                                           marginTop: 5,
                                           marginRight: 5,
                                           borderRadius: 50
                                       }}/>}
                        </View>
                        <View style={{paddingTop: 5,}}>
                            <Text style={{fontFamily: 'LexendDeca_400Regular', fontSize: 18}}>{creator}</Text>
                            <Text style={styles.font}>{createdAt}</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.topRightView}>
                    <View style={{paddingRight: 20}}>
                        <Text style={styles.infoTextPadding}>skill</Text>
                        <View style={styles.HStack}>
                            <Icon name={"stats-chart"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,

                            }}>{skill}</Text>
                        </View>

                    </View>
                    <View>
                        <Text style={styles.infoText}>people</Text>
                        <View style={styles.HStack}>
                            <Icon name={"people"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,

                            }
                            }>0/{peopleNeeded}</Text>

                        </View>

                    </View>
                </View>
            </View>
            <Text style={{fontFamily: "LexendDeca_400Regular", fontSize: 18}}>{title}</Text>
            <Text style={{fontFamily: "LexendDeca_300Light"}}>{description}</Text>
            <View style={{backgroundColor: 'transparent', minHeight: '40%'}}>

            </View>
            <View style={styles.HStack}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '75%'}}>
                    <View style={{paddingRight: 20}}>
                        <Text style={styles.infoTextPadding}>location</Text>
                        <View style={styles.HStack}>
                            <Icon name={"location"} size={25} color="black"/>
                            <Text numberOfLines={1} style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,
                                maxWidth: '80%',

                            }}>{location}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.infoTextPadding}>time</Text>
                        <View style={styles.HStack}>
                            <Icon name={"time"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,
                            }}>{strippedDate} {time}</Text>
                        </View>
                    </View>


                </View>
                <TouchableOpacity disabled={creatorUID === auth.currentUser.uid} onPress={() => sendRequest()}
                                  style={creatorUID === auth.currentUser.uid ? styles.DisabledButton : styles.Button}>
                    <Icon name={'send'} size={25} color={creatorUID === auth.currentUser.uid ? "gray" : "black"}/>
                </TouchableOpacity>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    eventContainer: {
        paddingLeft: 20,
        marginBottom: 5,
        paddingTop: 5,
        minWidth: '100%',
        minHeight: 250,
        backgroundColor: '#fff',

    },

    DisabledButton: {
        width: "15%",
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
        marginLeft: 20,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    HStack: {
        display: 'flex',
        flexDirection: 'row',

    },
    pfpContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#000',
        marginRight: 10,
    },
    pfp: {
        width: 50,
        height: 50,
        borderRadius: 50,

    },
    font: {
        fontFamily: 'LexendDeca_300Light',
    },
    infoTextPadding: {
        alignSelf: 'center',
        fontFamily: 'LexendDeca_200ExtraLight',
        color: 'gray',

    },


    topLeftView: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',


        minWidth: '47%',

    },
    Button: {
        width: "15%",
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topRightView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minWidth: '48%',
    },

    infoText: {
        fontFamily: 'LexendDeca_200ExtraLight',
        color: 'gray',

    }

});

export default Event;

