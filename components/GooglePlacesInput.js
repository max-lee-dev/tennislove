import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        <ScrollView horizontal={false} style={{flex: 1, width: '100%', height: '100%'}}>
            <ScrollView horizontal={true} style={{flex: 1, width: '100%', height: '100%'}}>

                <GooglePlacesAutocomplete
                    placeholder='Where To ?'
                    minLength={4}
                    autoFocus={true}
                    listViewDisplayed="auto"
                    returnKeyType={'search'}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        props.notifyChange(details.geometry.location, data);
                    }}
                    query={{
                        key: 'AIzaSyD1vgRw032C5MwJtjTEInGBaiVk7Typ3PE',
                        language: 'en',
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={200}
                    renderRow={(rowData) => {
                        const title = rowData.structured_formatting.main_text;
                        const address = rowData.structured_formatting.secondary_text;
                        return (
                            <View>
                                <Text style={{fontSize: 14}}>{title}</Text>
                                <Text style={{fontSize: 14}}>{address}</Text>
                            </View>
                        );
                    }}
                    styles={styles}>
                </GooglePlacesAutocomplete>
                <Text>i</Text>


            </ScrollView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        zIndex: 999,
        width: '90%',
    },
    row: {
        width: '100%'
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 45,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 1,
        zIndex: 999,
    },
    predefinedPlacesDescription: {
        color: '#1faadb'
    },
    listView: {
        top: 45.5,
        zIndex: 10,
        position: 'absolute',
        color: 'black',
        backgroundColor: "white",
        width: '89%',
    },
    separator: {
        flex: 1,
        backgroundColor: 'blue',
    },
    description: {
        flexDirection: "row",
        flexWrap: "wrap",
        fontSize: 14,
        maxWidth: '89%',
    }
});

export default GooglePlacesInput;