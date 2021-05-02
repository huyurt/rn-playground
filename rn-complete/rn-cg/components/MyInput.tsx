import React, {useState} from "react";
import {StyleSheet, Button, TextInput, View} from "react-native";

const MyInput = props => {
    const [myText, setMyText] = useState('');

    const myTextInputHandler = (text: String) => {
        setMyText(text);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='C... G...'
                style={styles.input}
                onChangeText={myTextInputHandler}
                value={myText}
            />
            <Button
                title='Ekle'
                onPress={props.addMyText.bind(this, myText)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
    },
});

export default MyInput;
