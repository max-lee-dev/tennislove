import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import {db, auth} from "../Firebase/firebase";
import {collection, addDoc, where, orderBy, query, onSnapshot} from "firebase/firestore";
import {useEffect, useState} from "react";

function ChatRoomButton({navigation, chatroom}) {
    const [otherUsername, setOtherUsername] = useState("");
    console.log("chatroom: " + chatroom.users[0] + " " + chatroom.users[1]);
    let otherUser;
    if (chatroom.users[0] === auth.currentUser?.uid) {
        otherUser = chatroom.users[1];
    } else {
        otherUser = chatroom.users[0];
    }

    const usersRef = collection(db, "users");
    const thisUserInfo = query(usersRef, where("uid", "==", otherUser));
    useEffect(() => {
        const snapshot = onSnapshot(thisUserInfo, (querySnapshot) => {
            querySnapshot.forEach((doc) => {

                setOtherUsername(doc.data().firstName + " " + doc.data().lastName);
            });
        });
    }, []);

    return (
        <View>
            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ChatScreen',
                {
                    roomID: chatroom.roomID,
                }
            )}>
                <Text>{otherUsername}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Button: {
        maxWidth: "50%",
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',


    }
})


export default ChatRoomButton;