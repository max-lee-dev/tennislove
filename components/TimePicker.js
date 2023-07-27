import React, {useState} from "react";
import {Button, Text, View, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const TimePicker = ({changeTime}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const [time, setTime] = useState('00:00 AM');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        let time = date.toLocaleTimeString();
        let ampm = time.substring(time.length - 2);
        time = time.split(" ")[0];
        time = time.substring(0, time.length - 3)
        time = time + " " + ampm;


        setTime(time);
        changeTime(time);

        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity style={styles.Button} onPress={showDatePicker}>
                <Text>{time} </Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
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
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,

        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TimePicker;