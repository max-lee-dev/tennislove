import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';

const data = [
    {label: '1.0', value: "1.0"},
    {label: '1.5', value: "1.5"},
    {label: '2.0', value: "2.0"},
    {label: '2.5', value: "2.5"},
    {label: '3.0', value: "3.0"},
    {label: '3.5', value: "3.5"},
    {label: '4.0', value: "4.0"},
    {label: '4.5', value: "4.5"},
    {label: '5.0', value: "5.0"},
    {label: '5.5', value: "5.5"},
    {label: '6.0', value: "6.0"},
    {label: '6.5', value: "6.5"},
    {label: '7.0', value: "7.0"},


];

const DropdownComponent = ({myfunction}) => {
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
                placeholder={!isFocus ? 'Select level' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    myfunction(item.value);
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <Feather
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="bar-chart-2"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {

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