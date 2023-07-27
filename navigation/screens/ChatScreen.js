import * as React from 'react';
import {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from '../../components/ChatMessage';
import {View, Text, Button, StyleSheet} from 'react-native';
import {auth} from '../../Firebase/firebase';
import {db} from '../../Firebase/firebase';
import {signOut} from 'firebase/auth';
import {collection, addDoc, orderBy, query, onSnapshot} from "firebase/firestore";

function ChatScreen({route, navigation}) {
    const messagesRef = collection(db, "messages");
    const chatQuery = query(messagesRef, orderBy("createdAt", "asc"));
    const [messages] = useCollectionData(chatQuery, {idField: 'id'});
    const {roomID} = route.params;
    console.log("roomID: " + roomID)

    function logout() {
        navigation.navigate('Log In');
        signOut(auth);
    }

    return (
        <View>
            <View style={{display: 'flex', alignSelf: 'center'}}>
                <Text>room id: {roomID}</Text>
            </View>

            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </View>
    )
}

const styles = StyleSheet.create({})

export default ChatScreen;