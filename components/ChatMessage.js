import {View, Text} from 'react-native';

function ChatMessage(message) {
    console.log(message);
    const {text, uid} = message.message;
    return (
        <View>
            <Text>{text}</Text>
        </View>
    )
}

export default ChatMessage;