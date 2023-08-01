import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Ionicons';

const data = [

    {label: '2005', value: '2005'},

    {label: '2004', value: '2004'},
    {label: '2003', value: '2003'},
    {label: '2002', value: '2002'},
    {label: '2001', value: '2001'},
    {label: '2000', value: '2000'},
    {label: '1999', value: '1999'},
    {label: '1998', value: '1998'},
    {label: '1997', value: '1997'},

    {label: '1996', value: '1996'},
    {label: '1995', value: '1995'},
    {label: '1994', value: '1994'},
    {label: '1993', value: '1993'},
    {label: '1992', value: '1992'},
    {label: '1991', value: '1991'},
    {label: '1990', value: '1990'},
    {label: '1989', value: '1989'},
    {label: '1988', value: '1988'},
    {label: '1987', value: '1987'},
    {label: '1986', value: '1986'},
    {label: '1985', value: '1985'},
    {label: '1984', value: '1984'},
    {label: '1983', value: '1983'},
    {label: '1982', value: '1982'},
    {label: '1981', value: '1981'},

    {label: '1980', value: '1980'},
    {label: '1979', value: '1979'},
    {label: '1978', value: '1978'},
    {label: '1977', value: '1977'},
    {label: '1976', value: '1976'},
    {label: '1975', value: '1975'},
    {label: '1974', value: '1974'},

    {label: '1973', value: '1973'},
    {label: '1972', value: '1972'},
    {label: '1971', value: '1971'},
    {label: '1970', value: '1970'},
    {label: '1969', value: '1969'},
    {label: '1968', value: '1968'},
    {label: '1967', value: '1967'},
    {label: '1966', value: '1966'},
    {label: '1965', value: '1965'},
    {label: '1964', value: '1964'},
    {label: '1963', value: '1963'},
    {label: '1962', value: '1962'},

    {label: '1961', value: '1961'},
    {label: '1960', value: '1960'},
    {label: '1959', value: '1959'},
    {label: '1958', value: '1958'},
    {label: '1957', value: '1957'},
    {label: '1956', value: '1956'},
    {label: '1955', value: '1955'},
    {label: '1954', value: '1954'},
    {label: '1953', value: '1953'},
    {label: '1952', value: '1952'},
    {label: '1951', value: '1951'},
    {label: '1950', value: '1950'},
    {label: '1949', value: '1949'},
    {label: '1948', value: '1948'},
    {label: '1947', value: '1947'},

    {label: '1946', value: '1946'},
    {label: '1945', value: '1945'},
    {label: '1944', value: '1944'},
    {label: '1943', value: '1943'},
    {label: '1942', value: '1942'},
    {label: '1941', value: '1941'},
    {label: '1940', value: '1940'},


];

const DOBDropdown = ({myfunction}) => {
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
                dropdownPosition={'top'}
                valueField="value"
                placeholder={!isFocus ? 'Select birth year' : '...'}
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
                        name="today"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default DOBDropdown;

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'white',
        width: '80%',
        borderRadius: 8,
        margin: 20,

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