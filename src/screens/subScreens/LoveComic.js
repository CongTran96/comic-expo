import React, { Component } from 'react';
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import {
    StyleProvider, Button, Container, Header, Left, Right,
    Content, Body, Title, Icon, Footer, FooterTab
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import { connect } from 'react-redux';
import { changeUrl, loveClick } from '../../reducers/modules/comics/actions';
import ListChapter from '../../components/List/ListChapter';

const background = require('../../assets/lover_butterfly.jpg');

class LoveComic extends Component {
    static navigationOptions = {
        tabBarVisible: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            loveComic: [],
        }
    }

    async clearData() {
        await AsyncStorage.clear();
    }

    componentWillMount() {
        // this.clearData();
        try {
            this.cripping();
        } catch (error) {
            console.log(error);
        }
    }

    componentWillReceiveProps() {
        this.cripping();
    }

    async cripping() {
        let loveComic = [];
        let result = await AsyncStorage.getAllKeys();
        let index = 0;
        result.forEach(async (key) => {
            if (key.search(/@ComicDetail/i) !== -1) {
                let value = await AsyncStorage.getItem(key);
                let prased = await JSON.parse(value);
                loveComic[index] = {};
                loveComic[index].name = prased.name;
                loveComic[index].link_url = prased.url;
                index++;
            }
        });
        this.setState({ loveComic });
    }

    onSelectedItem(item) {
        const { name, link_url } = item;
        const { navigate } = this.props.navigation;
        this.props.dispatch(changeUrl(link_url));
        this.props.dispatch(loveClick(true));
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
                    <Header>
                        <Left />
                        <Body>
                            <Title style={styles.title}>
                                Truyện yêu thích
                            </Title>
                        </Body>
                        <Right>
                            <Button transparent
                                onPress={() => { this.props.navigation.navigate('Search') }} >
                                <Icon name='search' style={styles.icon} />
                            </Button>
                        </Right>
                    </Header>
                    <View style={{ flex: 1 }} >
                        <ListChapter data={this.state.loveComic}
                            type='gender'
                            onSelectItem={this.onSelectedItem.bind(this)} />
                    </View>
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
        itemsLocal: state.comics.itemsLocal,
        isLove: state.comics.isLove,
    }
};

export default connect(mapStateToProps)(LoveComic);