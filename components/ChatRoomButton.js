import {View, TouchableOpacity, Text, StyleSheet, Image} from "react-native";
import {db, auth} from "../Firebase/firebase";
import {collection, addDoc, where, orderBy, query, onSnapshot} from "firebase/firestore";
import {useEffect, useState} from "react";
import blankpfp from "../assets/blankpfp.png";

function ChatRoomButton({navigation, chatroom}) {
    const [otherUserInfo, setOtherUserInfo] = useState(null);
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

                setOtherUserInfo(doc.data());
            });
        });
    }, []);

    return (
        <View>
            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ChatScreen',
                {
                    otherUID: otherUserInfo.uid,
                    roomID: chatroom.roomID,
                }
            )}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <View>
                        {otherUserInfo?.pfp ?
                            <Image source={{uri: otherUserInfo.pfp}}
                                   style={{width: 35, height: 35, borderRadius: 20}}/> :
                            <Image source={blankpfp} style={{width: 40, height: 40, borderRadius: 20}}/>}
                    </View>
                    <View>
                        <Text>{otherUserInfo?.firstName} {otherUserInfo?.lastName}</Text>
                    </View>
                </View>
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