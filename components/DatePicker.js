import React, {useState} from "react";
import {Button, Text, View, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const DatePicker = ({changeDate}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        setDate(date);
        changeDate(date);

        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity style={styles.Button} onPress={showDatePicker}>
                <Text>{date.toDateString()} </Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    Button: {
        minWidth: "45%",
        marginRight: 25,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,

        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DatePicker;