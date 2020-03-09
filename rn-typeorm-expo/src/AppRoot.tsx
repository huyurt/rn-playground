import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';
import {createConnection, getRepository} from "typeorm";
import {Author} from "./entities/author";
import {Category} from "./entities/category";
import {Post} from "./entities/post";
import {Kullanici} from "./entities/kullanici";
import {Siparis} from "./entities/siparis";

interface IAppProps {

}

interface IAppState {
    progress: string;
    loadedPost: Post | null;
    savedPost: boolean
}

export default class AppRoot extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            progress: 'Post is being saved',
            loadedPost: null,
            savedPost: false
        };
    }

    componentDidMount() {
        this.downloadDatabase();
    }

    async downloadDatabase() {
        const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;
        const {exists, isDirectory} = await FileSystem.getInfoAsync(sqliteDirectory);
        if (!exists) {
            await FileSystem.makeDirectoryAsync(sqliteDirectory);
        } else if (!isDirectory) {
            throw new Error('SQLite dir is not a directory');
        }

        const pathToDownloadTo = `${sqliteDirectory}/database.db`;
        const fileInfo = await FileSystem.getInfoAsync(pathToDownloadTo);
        if (!fileInfo.exists) {
            const uriToDownload = Asset.fromModule(require('../assets/db/database.db')).uri;
            console.log(`Download ${uriToDownload} to ${pathToDownloadTo}`);

            await FileSystem.downloadAsync(uriToDownload, pathToDownloadTo);
        }
        await this.runDemo();
    }

    connect() {
        return createConnection({
            database: 'database.db',
            driver: require('expo-sqlite'),
            entities: [
                Author,
                Category,
                Post,
                Kullanici,
                Siparis
            ],
            synchronize: false,
            type: 'expo'
        });
    }

    async runDemo() {
        await this.connect();

        const siparisRepo = getRepository(Siparis);
        const loadedPost = await siparisRepo.findOne({where: {Id: 1}, relations: ["Kullanici"]});

        if (loadedPost) {
            this.setState({
                loadedPost: JSON.stringify(loadedPost)
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to the Expo Example for TypeORM
                </Text>
                <Text style={styles.small}>
                    {this.state.progress}
                </Text>
                <Text style={styles.small}>
                    {JSON.stringify(this.state.loadedPost)}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    small: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5
    }
});