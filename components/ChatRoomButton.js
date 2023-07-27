import {View, TouchableOpacity, Text, StyleSheet} from "react-native";

function ChatRoomButton({navigation, chatroom}) {
    return (
        <View>
            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('ChatScreen',
                {
                    roomID: chatroom.roomID,


                }
            )}>
                <Text>Chat Room: {chatroom.roomID}</Text>
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