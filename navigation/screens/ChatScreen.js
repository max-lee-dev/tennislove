import * as React from 'react';
import {useState, useEffect, useLayoutEffect, useCallback, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from '../../components/ChatMessage';
import {View, Text, Button, Keyboard, StyleSheet, TextInput, ScrollView} from 'react-native';
import {auth} from '../../Firebase/firebase';
import {db} from '../../Firebase/firebase';
import {signOut} from 'firebase/auth';
import {collection, addDoc, where, getDocs, orderBy, query, onSnapshot} from "firebase/firestore";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';

function ChatScreen({route, navigation}) {
    const {roomID, pretext} = route.params;
    useEffect(() => {
        if (pretext) {
            setTextInput(pretext);
        }

    }, [pretext]);


    const ref = useRef(null);

    const messagesRef = collection(db, "messages");
    const sortedChatRoom = query(messagesRef, orderBy("createdAt", "asc"));


    const [messages] = useCollectionData(sortedChatRoom, {idField: 'id'});
    const [textInput, setTextInput] = useState("");


    //
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        if (isKeyboardVisible) {
            ref.current?.scrollToEnd({animated: true});
        }
    }, [isKeyboardVisible]);

    //

    function logout() {
        navigation.navigate('Log In');
        signOut(auth);
    }

    async function sendMessage() {
        const newMessage = {
            text: textInput,
            createdAt: new Date(),
            roomID: roomID,
            senderID: auth.currentUser.uid
        }
        setTextInput("");
        await addDoc(messagesRef, newMessage).then(() => {
            console.log('message sent')

        });

    }


    return (
        <View style={{backgroundColor: '#fff', minHeight: '100%'}}>
            <View style={{display: 'flex', alignSelf: 'center'}}>
                <Text>room id: {roomID}</Text>
            </View>
            <ScrollView style={isKeyboardVisible ? styles.keyboardShownView : styles.keyboardHiddenView}
                        ref={ref}
                        onContentSizeChange={() => ref.current?.scrollToEnd({animated: true})}
            >
                {messages && messages.map(msg => <ChatMessage key={msg.id} senderID={msg.senderID} ogRoom={roomID}
                                                              msgRoomId={msg.roomID} message={msg.text}
                />)}

            </ScrollView>

            <View style={styles.formContainer}>
                <TextInput style={styles.textInput} onChangeText={setTextInput} value={textInput}/>

                <TouchableOpacity onPress={() => sendMessage()} style={{paddingRight: 5, paddingTop: 2}}>
                    <Icon name="send" size={30} color="#000"/>
                </TouchableOpacity>


            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        background: '#000',
        minHeight: '100%',
    },
    Button: {
        zIndex: 5,
    },
    keyboardHiddenView: {
        flex: '1',
        flexDirection: 'column',
        maxHeight: '80%',
        backgroundColor: '#fff',
        width: '100%',
    },
    keyboardShownView: {
        flex: '1',
        flexDirection: 'column',
        maxHeight: '40%',
        backgroundColor: '#fff',
        width: '100%',

    },

    formContainer: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginTop: 20,
        width: "99%",
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 1,
        color: "#030202",


    },
    textInput: {
        alignSelf: 'flex-start',
        height: 40,
        width: "90%",
        borderRadius: 10,
        borderColor: "#000",
        color: "#030202",

        marginTop: 0,
        paddingLeft: 10,

        fontSize: 16,
        fontFamily: 'LexendDeca_300Light',

    },
})

export default ChatScreen;