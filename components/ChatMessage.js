import {View, Text, StyleSheet, Image, Touchable} from 'react-native';
import {auth} from '../Firebase/firebase'
import blankpfp from '../assets/blankpfp.png';
import {TouchableOpacity} from "react-native-gesture-handler";

function ChatMessage({navigation, pfp, senderID, ogRoom, msgRoomId, message, createdAt}) {
    let thisRoom = ogRoom === msgRoomId;
    let thisUser = senderID === auth.currentUser?.uid;
    let when = createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    return (
        <View style={styles.messageContainer}>

            {thisRoom && thisUser &&
                <View style={styles.myMessageContainer}>
                    <View style={{width: '100%'}}>
                        <View style={{
                            width: '50%',
                            minHeight: 10,
                            padding: 15,
                            backgroundColor: '#F8F8F8',
                            borderRadius: 10
                        }}>
                            <Text style={styles.myMessage}>{message}</Text>
                        </View>
                        <Text style={{paddingLeft: 5, fontSize: 12}}>{when}</Text>
                    </View>
                </View>
            }
            {thisRoom && !thisUser &&
                <View style={styles.theirMessageContainer}>
                    <View style={styles.pfpContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', {userID: senderID})}>
                            <Image source={pfp ? {uri: pfp} : blankpfp} style={styles.pfp}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%'}}>
                        <View style={{
                            width: '50%',
                            minHeight: 10,

                            padding: 10,

                            borderColor: '#F8F8F8',
                            borderWidth: 2,
                            borderRadius: 10
                        }}>
                            <Text style={styles.theirMessage}>{message}</Text>
                        </View>
                        <Text style={{paddingLeft: 5, fontSize: 12}}>{when}</Text>
                    </View>

                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        margin: 8,
    },
    myMessageContainer: {
        position: 'relative',
        alignSelf: 'flex-end',


    },
    theirMessageContainer: {
        flex: 1,

        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,

    },
    pfpContainer: {
        width: 35,
        height: 35,
        marginTop: 5,
        borderRadius: 50,
        backgroundColor: '#000',
        marginRight: 10,
    },
    pfp: {
        width: 35,
        height: 35,
        borderRadius: 50,

    },

    myMessage: {
        maxWidth: '100%',
        fontFamily: 'LexendDeca_300Light',


        color: '#000',
    },
    theirMessage: {
        maxWidth: '100%',
        color: '#000',
        fontFamily: 'LexendDeca_300Light',

    }

})
export default ChatMessage;