import * as React from 'react';
import {useState, useEffect, useLayoutEffect, useCallback, useRef} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from '../../components/ChatMessage';
import {View, Text, Button, Keyboard, StyleSheet, TextInput, ScrollView, Image, SafeAreaView} from 'react-native';
import {auth} from '../../Firebase/firebase';
import {db} from '../../Firebase/firebase';
import {signOut} from 'firebase/auth';
import {collection, addDoc, where, getDocs, orderBy, query, onSnapshot} from "firebase/firestore";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Feather';
import {BlurView} from 'expo-blur';
import {blankpfp} from '../../assets/blankpfp.png';

function ChatScreen({route, navigation}) {
    const [userInfo, setUserInfo] = useState([]);
    const [otherUserInfo, setOtherUserInfo] = useState([]);

    useEffect(() => {

        const userCollectionRef = collection(db, "users");
        const q = query(userCollectionRef, where("uid", "==", auth.currentUser.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserInfo(doc.data());
            });
        });

        const otherUser = query(userCollectionRef, where("uid", "==", route.params.otherUID));
        const unsub2 = onSnapshot(otherUser, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setOtherUserInfo(doc.data());
                });
            }
        );

        return unsub;

    }, []); // tihs prob broken


    const {roomID, pretext, otherUID} = route.params;
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


    async function sendMessage() {
        const newMessage = {
            text: textInput,
            createdAt: new Date(),
            roomID: roomID,
            senderPFP: userInfo.pfp,
            senderID: auth.currentUser.uid
        }
        setTextInput("");
        await addDoc(messagesRef, newMessage).then(() => {
            console.log('message sent')

        });

    }


    return (
        <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
            <BlurView intensity={90}
                      tint="light" style={{

                width: '100%',
                height: '13%',

            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingLeft: 10}}>
                    <Icon name="chevron-left" size={35} color={"#007AFF"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {userID: otherUID})}>

                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',


                        justifyContent: 'center',
                    }}>

                        {otherUserInfo.pfp ? <Image source={{uri: otherUserInfo.pfp}} style={{
                            width: 30,

                            height: 30,
                            borderRadius: 50,
                            marginRight: 10,
                        }}/> : <Image source={blankpfp} style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            marginRight: 10,
                        }}/>

                        }
                        <Text style={{
                            color: '#000',
                            fontSize: 18,
                            fontFamily: 'LexendDeca_400Regular',
                        }}>{otherUserInfo.firstName} {otherUserInfo.lastName}</Text>
                    </View>
                </TouchableOpacity>

            </BlurView>
            <ScrollView style={isKeyboardVisible ? styles.keyboardShownView : styles.keyboardHiddenView}
                        ref={ref}
                        onContentSizeChange={() => ref.current?.scrollToEnd({animated: true})}
            >
                {messages && messages.map(msg => <ChatMessage navigation={navigation} senderID={msg.senderID}
                                                              ogRoom={roomID}
                                                              pfp={msg.senderPFP} msgRoomId={msg.roomID}
                                                              message={msg.text} createdAt={msg.createdAt} key={msg.id}
                />)}

            </ScrollView>

            <View style={styles.formContainer}>
                <TextInput style={styles.textInput} onChangeText={setTextInput} value={textInput}/>

                <TouchableOpacity onPress={() => sendMessage()} style={{paddingRight: 10, paddingTop: 5}}>
                    <Icon name="send" size={25} color="#000"/>
                </TouchableOpacity>


            </View>


        </SafeAreaView>
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