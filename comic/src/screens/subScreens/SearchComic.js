import React, { Component } from 'react';
import { StyleSheet, Image, View, AsyncStorage, TouchableOpacity, Text, TextInput } from 'react-native';
import {
    StyleProvider, Button, Container, Header, Left, Right,
    Content, Body, Title, Icon, Footer, FooterTab, Item, Input
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import { connect } from 'react-redux';
import { changeUrl } from '../../reducers/modules/comics/actions';
import ListChapter from '../../components/List/ListChapter';
import SearchBar from 'react-native-searchbar';
import { filter, some, includes } from 'lodash/collection';
import { debounce } from 'lodash/function';

const background = require('../../assets/lover_butterfly.jpg');

class SearchComic extends Component {
    static navigationOptions = {
        tabBarVisible: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            listComic: [],
            results: [],
            input: '',
        };
        this._handleResults = this._handleResults.bind(this);
    }

    async getListComics() {
        try {
            let value = await AsyncStorage.getItem('@ListComic:comics');
            let listComic = JSON.parse(value);
            this.setState({ listComic });
        } catch (error) {
            console.log(error);
        }
    }

    componentWillMount() {
        this.getListComics();
    }

    componentWillReceiveProps() {
        this.getListComics();
    }

    _handleResults(results) {
        if (results.length > 20)
            results = results.slice(0, 20);
        this.setState({ results });
    };

    _onChangeText = input => {
        this.setState({ input });
        const results = this._internalSearch(input);
        this._handleResults(results);
    };

    _internalSearch = input => {
        const data = this.state.listComic;
        if (input === '') {
            return [];
        }
        return filter(data, item => {
            return this._depthFirstSearch(item, input);
        });
    };

    _depthFirstSearch = (collection, input) => {
        // let's get recursive boi
        let type = typeof collection;
        // base case(s)
        if (type === 'string' || type === 'number' || type === 'boolean') {
            return includes(
                collection.toString().toLowerCase(),
                input.toString().toLowerCase()
            );
        }
        return some(collection, item => this._depthFirstSearch(item, input));
    };

    onSelectItem(item) {
        const { name, link_url } = item;
        const { navigate } = this.props.navigation;
        this.props.dispatch(changeUrl(link_url));
        navigate('Detail', { comic: { name } });
    }

    render() {

        return (
            <StyleProvider style={getTheme()}>
                <Container >
                    <Image source={background}
                        style={styles.backgroundImage} />
                    <View
                        style={[styles.backgroundImage, styles.opacityBackground]}>
                    </View>
                    <View style={[styles.backgroundImage, { backgroundColor: 'rgba(83,103,69,0.1)' }]} />
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search"
                                onChangeText={input => this._onChangeText(input)}
                                value={this.state.input} />
                            <Icon name="ios-people" />
                        </Item>
                        <Button transparent onPress={() => { this.setState({ input: '', results: [] }) }}>
                            <Text>Cancel</Text>
                        </Button>
                    </Header>
                    <Content >
                        <ListChapter data={this.state.results}
                            type='SerchComic'
                            onSelectItem={this.onSelectItem.bind(this)} />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    icon: {
        fontSize: 28,
        color: '#fff',
        marginTop: 5,
    },
    title: {
        color: '#fff',
    },
    opacityBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }
});

const mapStateToProps = (state) => {
    return {
        listComic: state.comics.listComic,
    }
};

export default connect(mapStateToProps)(SearchComic);