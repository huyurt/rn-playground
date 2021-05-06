import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {fontSizes, spacing} from "../../utils/sizes";
import {colors} from "../../utils/colors";
import {RoundedButton} from "../../components/RoundedButton";

const HistoryItem = ({item, index}) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>
}

export const FocusHistory = ({focusHistory, onClear}) => {
    const clearHistory = () => {
        onClear();
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                {!!focusHistory.length && (
                    <>
                        <Text style={styles.title}>Geçmiş</Text>
                        <FlatList style={{flex: 1}} contentContainerStyle={{flex: 1, alignItems: 'center'}}
                                  data={focusHistory} renderItem={HistoryItem}/>
                        <View style={styles.clearContainer}>
                            <RoundedButton size={fontSizes.xxxl} title='Temizle' onPress={() => onClear()}/>
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
    },
    historyItem: (status) => ({
        color: status > 1 ? 'red' : 'green',
    }),
    title: {
        color: colors.white,
        fontSize: fontSizes.lg,
    },
    clearContainer: {
        alignItems: 'center',
        padding: spacing.md,
    },
});
