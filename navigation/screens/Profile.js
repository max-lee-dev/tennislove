import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {auth, db} from '../../Firebase/firebase';
import {getFirestore, getDoc, doc, addDoc, setDoc, collection} from "firebase/firestore";

function Profile({navigation, route}) {
    const {userID} = route.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const userRef = doc(db, "users", userID);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                setUser(userSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        getUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.profile}>
                    <Image style={styles.profilePic}
                           source={user?.profilePic ? {uri: user?.profilePic} : require('../../assets/blankpfp.png')}/>
                    <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.username}>@{user?.username}</Text>
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
});

export default Profile;