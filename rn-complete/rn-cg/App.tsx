import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MyInput from "./components/MyInput";
import MyItem from "./components/MyItem";

export default function App() {
    const [listMyText, setListMyText] = useState([]);

    const addMyTextHandler = enteredText => {
        setListMyText(currentListMyText =>
            [...currentListMyText,
                {
                    id: Math.random().toString(),
                    value: enteredText,
                }
            ]
        );
    };

    const removeMyTextHandler = myTextId => {
        setListMyText(currentListMyText => {
            return currentListMyText.filter((text) => text.id !== myTextId);
        })
    };

    return (
        <View style={styles.screen}>
            <MyInput addMyText={addMyTextHandler}/>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={listMyText}
                renderItem={itemData => (
                    <MyItem title={itemData.item.value} id={itemData.item.id} deleteMyText={removeMyTextHandler}/>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
});
