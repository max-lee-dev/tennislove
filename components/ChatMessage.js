import {View, Text, StyleSheet} from 'react-native';
import {auth} from '../Firebase/firebase'

function ChatMessage({senderID, ogRoom, msgRoomId, message}) {
    let thisRoom = ogRoom === msgRoomId;
    let thisUser = senderID === auth.currentUser?.uid;

    return (
        <View style={styles.messageContainer}>
            {thisRoom && thisUser &&
                <View style={styles.myMessageContainer}>
                    <Text style={styles.myMessage}>you: {message}</Text>
                </View>
            }
            {thisRoom && !thisUser &&
                <View style={styles.theirMessageContainer}>
                    <Text style={styles.theirMessage}>them: {message}</Text>

                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 8,
        width: '100%',
    },
    myMessageContainer: {
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    theirMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,

    },

    myMessage: {
        color: '#000',
    },
    theirMessage: {
        color: '#000',

    }

})
export default ChatMessage;