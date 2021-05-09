import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRound, setGuessRound] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)}
                        onError={(err) => console.log(err)}/>
        );
    }

    const configureNewGameHandler = () => {
        setGuessRound(0);
        setUserNumber(null);
    };

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);
        setGuessRound(0);
    }

    const gameOverHandler = numOfRounds => {
        setGuessRound(numOfRounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler}/>;
    if (userNumber && guessRound <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
        );
    } else if (guessRound > 0) {
        content = (
            <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onRestart={configureNewGameHandler}/>
        );
    }

    return (
		<SafeAreaView>
			<View style={styles.screen}>
				<Header title='Guess a Number'/>
				{content}
			</View>
		</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
