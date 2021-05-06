import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Focus} from "./src/features/focus/Focus";
import {colors} from "./src/utils/colors";
import {Timer} from "./src/features/timer/Timer";
import {spacing} from "./src/utils/sizes";
import {FocusHistory} from "./src/features/focus/FocusHistory";
import NativeAsyncStorage from "react-native/Libraries/Storage/NativeAsyncStorage";

const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2,
};
export default function App() {
    const [focusSubject, setFocusSubject] = useState(null);
    const [focusHistory, setFocusHistory] = useState([]);

    const addFocusHistorySubjectWithStatus = (subject, status) => {
        setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1), subject, status}]);
    };

    const onClear = () => {
        setFocusHistory([]);
    };

    const saveFocusHistory = () => {
        try {
            NativeAsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
        } catch (e) {

        }
    };

    const loadFocusHistory = async () => {
        try {
            const history = await NativeAsyncStorage.getItem('focusHistory');
            if (history && JSON.parse(history).length) {
                setFocusHistory(JSON.parse(history));
            }
        } catch (e) {

        }
    };

    useEffect(() => {
        loadFocusHistory();
    }, [])

    useEffect(() => {
        saveFocusHistory();
    }, [focusHistory]);

    useEffect(() => {
        if (focusSubject) {
            setFocusHistory([...focusHistory, focusSubject]);
        }
    }, [focusSubject]);

    return (
        <View style={styles.container}>
            {focusSubject ? (
                <Timer focusSubject={focusSubject} onTimerEnd={() => {
                    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
                    setFocusSubject(null);
                }} clearSubject={() => {
                    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
                    setFocusSubject(null)
                }}/>
            ) : (
                <View style={{flex: 1}}>
                    <Focus addSubject={setFocusSubject}/>
                    <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
        backgroundColor: colors.darkblue,
    },
});
