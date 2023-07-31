import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';

const data = [
    {label: 'Alabama', value: 'Alabama'},
    {label: 'Alaska', value: 'Alaska'},
    {label: 'Arizona', value: 'Arizona'},
    {label: 'Arkansas', value: 'Arkansas'},
    {label: 'California', value: 'California'},
    {label: 'Colorado', value: 'Colorado'},
    {label: 'Connecticut', value: 'Connecticut'},
    {label: 'Delaware', value: 'Delaware'},
    {label: 'Florida', value: 'Florida'},
    {label: 'Georgia', value: 'Georgia'},
    {label: 'Hawaii', value: 'Hawaii'},
    {label: 'Idaho', value: 'Idaho'},
    {label: 'Illinois', value: 'Illinois'},
    {label: 'Indiana', value: 'Indiana'},
    {label: 'Iowa', value: 'Iowa'},
    {label: 'Kansas', value: 'Kansas'},
    {label: 'Kentucky', value: 'Kentucky'},
    {label: 'Louisiana', value: 'Louisiana'},
    {label: 'Maine', value: 'Maine'},
    {label: 'Maryland', value: 'Maryland'},
    {label: 'Massachusetts', value: 'Massachusetts'},
    {label: 'Michigan', value: 'Michigan'},
    {label: 'Minnesota', value: 'Minnesota'},
    {label: 'Mississippi', value: 'Mississippi'},
    {label: 'Missouri', value: 'Missouri'},
    {label: 'Montana', value: 'Montana'},
    {label: 'Nebraska', value: 'Nebraska'},
    {label: 'Nevada', value: 'Nevada'},
    {label: 'New Hampshire', value: 'New Hampshire'},
    {label: 'New Jersey', value: 'New Jersey'},
    {label: 'New Mexico', value: 'New Mexico'},
    {label: 'New York', value: 'New York'},
    {label: 'North Carolina', value: 'North Carolina'},
    {label: 'North Dakota', value: 'North Dakota'},
    {label: 'Ohio', value: 'Ohio'},
    {label: 'Oklahoma', value: 'Oklahoma'},
    {label: 'Oregon', value: 'Oregon'},
    {label: 'Pennsylvania', value: 'Pennsylvania'},
    {label: 'Rhode Island', value: 'Rhode Island'},
    {label: 'South Carolina', value: 'South Carolina'},
    {label: 'South Dakota', value: 'South Dakota'},

    {label: 'Tennessee', value: 'Tennessee'},
    {label: 'Texas', value: 'Texas'},
    {label: 'Utah', value: 'Utah'},

    {label: 'Vermont', value: 'Vermont'},
    {label: 'Virginia', value: 'Virginia'},
    {label: 'Washington', value: 'Washington'},
    {label: 'West Virginia', value: 'West Virginia'},
    {label: 'Wisconsin', value: 'Wisconsin'},
    {label: 'Wyoming', value: 'Wyoming'},

];


const StatesDropdown = ({myfunction}) => {
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
                dropdownPosition={'top'}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select state' : '...'}
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
                        name="map-pin"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default StatesDropdown;

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
