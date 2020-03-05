import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {createConnection, getRepository} from "typeorm";
import {Author} from "./entities/author";
import {Category} from "./entities/category";
import {Post} from "./entities/post";

interface IAppProps {

}

interface IAppState {
    progress: string;
    loadedPost: Post | null;
    savedPost: boolean
}

export default class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            progress: 'Post is being saved',
            loadedPost: null,
            savedPost: false
        };
        this.runDemo();
    }

    connect() {
        return createConnection({
            database: 'test',
            driver: require('expo-sqlite'),
            entities: [
                Author,
                Category,
                Post
            ],
            synchronize: true,
            type: 'expo'
        });
    }

    async runDemo() {
        await this.connect();

        const category1 = new Category();
        category1.name = "Programming";

        const category2 = new Category();
        category2.name = 'Typescript';

        const author1 = new Author();
        author1.name = 'Anonymous';

        const author2 = new Author();
        author2.name = 'Bananaymous';

        const post1 = new Post();
        post1.title = 'Control flow based type analysis';
        post1.text = 'TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.';
        post1.categories = [category1, category2];
        post1.author = author1;

        const postRepo = getRepository(Post);
        await postRepo.save(post1);

        const post2 = new Post();
        post2.title = 'AAAAaaaaaaaa';
        post2.text = ':)';
        post2.categories = [category1];
        post2.author = author2;
        await postRepo.save(post2);

        this.setState({
            progress: "Post has been saved"
        });

        const loadedPost = await postRepo.findOne({where: {id: post2.id}, relations: ["author", "categories"]});

        if (loadedPost) {
            this.setState({
                loadedPost: loadedPost
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