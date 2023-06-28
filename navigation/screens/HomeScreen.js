import React, {useState, useEffect} from 'react';
import {auth} from '../../Firebase/firebase';
import {View, Text, Button} from 'react-native';

function HomeScreen({navigation}) {

    useEffect(() => {
        console.log('test')
        if (!auth.currentUser) {
            navigation.navigate('Log In');
        }
    }, []);


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button
                title="Log out"
                onPress={() => {
                    auth.signOut();
                    navigation.navigate('Log In')
                }
                }
            />

        </View>
    )
}

export default HomeScreen;