import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const MyItem = props => {
    return (
        <TouchableOpacity onPress={props.deleteMyText.bind(this, props.id)}>
            <View style={styles.listItem}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default MyItem;
