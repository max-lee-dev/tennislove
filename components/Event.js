import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View, TextInput, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import blankpfp from '../assets/blankpfp.png';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    useFonts,
    LexendDeca_100Thin,
    LexendDeca_200ExtraLight,
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_800ExtraBold,
    LexendDeca_900Black,
} from "@expo-google-fonts/lexend-deca";


function Event({title, createdAt, description, location, date, time, skill, creator, peopleNeeded}) {
    let [fontsLoaded] = useFonts({
        LexendDeca_100Thin,
        LexendDeca_200ExtraLight,
        LexendDeca_300Light,
        LexendDeca_400Regular,
        LexendDeca_500Medium,
        LexendDeca_600SemiBold,
        LexendDeca_700Bold,
        LexendDeca_800ExtraBold,
        LexendDeca_900Black,
    });
    const strippedDate = date?.substring(0, date.length - 5)
    if (!fontsLoaded) {
        return <Text> Loading... </Text>

    }
    return (
        <View style={styles.eventContainer}>
            <View style={styles.HStack}>

                <View style={styles.topLeftView}>
                    <View style={{marginRight: 5, marginLeft: 0}}>
                        <Image source={blankpfp} style={{width: 50, height: 50}}/>
                    </View>
                    <View style={{paddingTop: 5,}}>
                        <Text style={{fontFamily: 'LexendDeca_400Regular', fontSize: 18}}>{creator}</Text>
                        <Text style={styles.font}>{createdAt}</Text>
                    </View>

                </View>

                <View style={styles.topRightView}>
                    <View style={{paddingRight: 20}}>
                        <Text style={styles.infoTextPadding}>skill</Text>
                        <View style={styles.HStack}>
                            <Icon name={"stats-chart"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,

                            }}>{skill}</Text>
                        </View>

                    </View>
                    <View>
                        <Text style={styles.infoText}>people</Text>
                        <View style={styles.HStack}>
                            <Icon name={"people"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,

                            }
                            }>0/{peopleNeeded}</Text>

                        </View>

                    </View>
                </View>
            </View>
            <Text style={{fontFamily: "LexendDeca_400Regular", fontSize: 18}}>{title}</Text>
            <Text style={{fontFamily: "LexendDeca_300Light"}}>{description}</Text>
            <View style={{backgroundColor: 'transparent', minHeight: '40%'}}>

            </View>
            <View style={styles.HStack}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '75%'}}>
                    <View style={{paddingRight: 20}}>
                        <Text style={styles.infoTextPadding}>location</Text>
                        <View style={styles.HStack}>
                            <Icon name={"location"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,
                            }}>{location}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.infoTextPadding}>time</Text>
                        <View style={styles.HStack}>
                            <Icon name={"time"} size={25} color="black"/>
                            <Text style={{
                                fontFamily: 'LexendDeca_300Light',
                                paddingLeft: 5,
                                paddingTop: 3,
                                fontSize: 18,
                            }}>{strippedDate} {time}</Text>
                        </View>
                    </View>


                </View>
                <TouchableOpacity style={styles.Button}>
                    <Icon name={'send'} size={25} color="black"/>
                </TouchableOpacity>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    eventContainer: {
        paddingLeft: 20,
        marginBottom: 5,
        minWidth: '100%',
        minHeight: 200,
        backgroundColor: '#fff',

    },
    HStack: {
        display: 'flex',
        flexDirection: 'row',

    },
    font: {
        fontFamily: 'LexendDeca_300Light',
    },
    infoTextPadding: {
        alignSelf: 'center',
        fontFamily: 'LexendDeca_200ExtraLight',
        color: 'gray',

    },


    topLeftView: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',


        minWidth: '47%',

    },
    Button: {
        width: "15%",
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topRightView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minWidth: '48%',
    },

    infoText: {
        fontFamily: 'LexendDeca_200ExtraLight',
        color: 'gray',

    }

});

export default Event;

