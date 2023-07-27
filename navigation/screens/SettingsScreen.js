import * as React from 'react';

import {View, Text, Button} from 'react-native';
import {auth} from '../../Firebase/firebase';
import {signOut} from 'firebase/auth';

function SettingsScreen({navigation}) {

    const logout = () => {
        navigation.navigate('Log In');
        signOut(auth);

    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Settings Screen</Text>
            <Button onPress={logout} title="Log Out">
                Log Out
            </Button>
        </View>
    )
}

export default SettingsScreen;