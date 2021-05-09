import React, {useState} from 'react';
import {Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView, KeyboardAvoidingView} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert('Invalid number!', 'Number has to be a number between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        setEnteredValue('');
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        );
    }

    return (
		<ScrollView>
			<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => {
					Keyboard.dismiss();
				}}>
					<View style={styles.screen}>
						<Text style={styles.title}>The Game Screen!</Text>
						<Card style={styles.inputContainer}>
							<Text style={styles.text}>Select a Number</Text>
							<Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false}
								keyboardType='number-pad' maxLength={2} onChangeText={numberInputHandler}
								value={enteredValue}/>
							<View style={styles.buttonContainer}>
								<View style={styles.button}>
									<Button title='Reset' color={Colors.accent} onPress={resetInputHandler}/>
								</View>
								<View style={styles.button}>
									<Button title='Confirm' color={Colors.primary} onPress={confirmInputHandler}/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 120,
    },
    input: {
        width: 50,
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-sans',
    },
});

export default StartGameScreen;