import * as React from 'react';
import {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from '../../components/ChatMessage';
import {View, Text, Button, TouchableOpacity, StyleSheet, Modal, ScrollView} from 'react-native';
import {auth} from '../../Firebase/firebase';
import {db} from '../../Firebase/firebase';
import {signOut} from 'firebase/auth';
import ChatRoomButton from '../../components/ChatRoomButton';
import {collection, addDoc, where, orderBy, query, onSnapshot} from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';


function ChatHub({navigation}) {
    
    const usersRef = collection(db, "users");

    const [userInfo, setUserInfo] = useState(null);
    const thisUserInfo = query(usersRef, where("uid", "==", auth.currentUser?.uid));
    useEffect(() => {
        const snapshot = onSnapshot(thisUserInfo, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserInfo(doc.data());
            });
        });
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const chatroomRef = collection(db, "chatrooms");
    const myChatRooms = query(chatroomRef, where("users", "array-contains", auth.currentUser.uid));
    const [chatrooms] = useCollectionData(myChatRooms, {idField: 'id'});

    let usersQuery;
    if (userInfo?.state) {


        usersQuery = query(usersRef, where("state", "!=", userInfo?.state)); // change to == later
    }
    const [users] = useCollectionData(usersQuery, {idField: 'id'});

    function logout() {
        navigation.navigate('Log In');
        signOut(auth);
    }

    async function createRoom(user) {
        const uids = [auth.currentUser.uid, user.uid];
        const sortedID = uids.sort().join('');
        console.log("WORKED: ? " + sortedID);

        const newChatroom = {
            users: [auth.currentUser.uid, user.uid],
            messages: [],
            createdAt: new Date(),
            roomID: sortedID
        }

        if (chatrooms) {
            let exists = false;

            chatrooms.forEach(chatroom => {
                if (chatroom.roomID === sortedID) {
                    navigation.navigate('ChatScreen', {roomID: sortedID});
                    console.log("already exists")
                    exists = true;
                    setModalVisible(false);

                }
            })
            if (!exists) {

                console.log("trying to add")
                addDoc(chatroomRef, newChatroom).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    navigation.navigate('ChatScreen', {roomID: auth.currentUser.uid + user.uid})
                    setModalVisible(false);


                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });


            }
        }


    }


    return (
        <View>
            <View style={{
                backgroundColor: 'white',
                minWidth: '100%',
                minHeight: 50,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={styles.Button} onPress={() => setModalVisible(true)}>
                    <Icon name={'add'} size={30}/>
                </TouchableOpacity>

            </View>
            {chatrooms && chatrooms.map(chatroom => <ChatRoomButton navigation={navigation} key={chatroom.id}
                                                                    chatroom={chatroom}/>)}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{paddingLeft: 5,}} onPress={() => setModalVisible(false)}>
                            <Icon name={'close'} size={30}/>
                        </TouchableOpacity>
                        <ScrollView style={styles.insideModalView}>
                            <Text style={styles.modalText}>Create a Chat Room with people from {userInfo?.state}</Text>
                            {users && users.map(user => <TouchableOpacity style={styles.Button}
                                                                          onPress={() => createRoom(user)}
                                                                          key={user?.uid}>
                                    <Text>{user?.firstName} {user?.lastName}</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>

                    </View>

                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: "center",

        alignItems: "center",
        marginTop: 22,

    },
    modalView: {

        backgroundColor: "white",
        borderRadius: 20,

        minWidth: '90%',
        maxHeight: '70%',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,

        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,


    },

})

export default ChatHub;