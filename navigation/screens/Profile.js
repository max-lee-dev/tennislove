import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {auth, db} from '../../Firebase/firebase';
import {getFirestore, getDoc, doc, addDoc, setDoc, collection, query, where, onSnapshot} from "firebase/firestore";
import blankpfp from '../../assets/blankpfp.png';

function Profile({navigation, route}) {
    const {userID} = route.params;
    console.log("id: " + userID)
    const [user, setUser] = useState(null);
    useEffect(() => {
        const userCollectionRef = collection(db, "users");
        const q = query(userCollectionRef, where("uid", "==", userID));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        });
        return unsub;
    }, [userID]);

    return (
        <View style={styles.container}>

            <View style={styles.body}>
                <View style={styles.profile}>
                    {user?.pfp ?
                        <Image source={{uri: user.pfp}}
                               style={{width: 100, height: 100, borderRadius: 50}}/> :
                        <Image source={blankpfp} style={{width: 100, height: 100, borderRadius: 50}}/>}

                    <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
                </View>

            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
    ,
    header: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',


    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        flex: 9,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },


});

export default Profile;