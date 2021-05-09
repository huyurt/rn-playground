import React from 'react';
import {Button, Image, StyleSheet, Text, View, SafeAreaView, ScrollView} from "react-native";

const GameOverScreen = props => {
    return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.screen}>
					<Text>The Game is Over!</Text>
					<View style={styles.imageContainer}>
						<Image style={styles.image} resizeMode='cover' source={require('../../assets/success.png')}/>
					</View>
					<Text>Number of rounds: {props.roundsNumber}</Text>
					<Text>Number was: {props.userNumber}</Text>
					<Button title='NEW GAME' onPress={props.onRestart}/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default GameOverScreen;