import React from "react";
import {StyleSheet, Text, View} from "react-native";

const FavoritesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Categories Screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default FavoritesScreen;