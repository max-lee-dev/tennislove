import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        <View style={{flex: 1, width: '100%', height: '100%'}}>

            <GooglePlacesAutocomplete
                placeholder='Where To ?'
                debounce={400}
                query={{
                    key: '',
                    language: 'en',
                }}
                onPress={(data, details = null) => {
                    console.log(data, details);
                }}

                styles={styles}>
            </GooglePlacesAutocomplete>
            <Text>is</Text>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        paddingTop: '6%',
        width: '100%',
        alignSelf: 'center',
    },
    textInput: {
        backgroundColor: '#e0e0e0',
        fontSize: 22,

    },
    textInputContainer: {}

});

export default GooglePlacesInput;