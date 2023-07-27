import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Ionicons';

const data = [
    {label: '1', value: "1"},
    {label: '2', value: "2"},
    {label: '3', value: "3"},
    {label: '4', value: "4"},
    {label: '5', value: "5"},
    {label: '6', value: "6"},
    {label: '7', value: "7"},
    {label: '8', value: "8"},
    {label: '9', value: "9"},
    {label: '10', value: "10"},


];


const PeopleDropdown = ({changePeople}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && {color: 'transparent'}]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select State' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    changePeople(item.value);
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <Feather
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="people"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default PeopleDropdown;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,

        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,

    },
    dropdown: {

        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        color: "transparent"
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {

        height: 40,
        fontSize: 16,
    },
});
