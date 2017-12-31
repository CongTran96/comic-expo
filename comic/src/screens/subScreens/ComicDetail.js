import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, View, ActivityIndicator } from 'react-native';
import { StyleProvider, Button, Container, Header, Left, Right, Content, Body, Title, Icon, AnimationButton } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import { connect } from 'react-redux';
import cio from 'cheerio-without-node-native';
import { changeUrl, saveItem, loveClick, setComic, setIndexCurrentComic } from '../../reducers/modules/comics/actions';
import { removeSpace, displayMax } from '../../extends/String';
import ListChapter from '../../components/List/ListChapter';
import ComicInstruction from '../../components/InstructionDetail';
import fetchData from '../../extends/FetchData';
import NavigationBar from '../NavigationBar';
import { BallIndicator } from 'react-native-indicators';

const background = require('../../assets/lover_butterfly.jpg');

class ComicDetail extends Component {
    state = {
        comic: {},
        saved: false,
        isLoading: true,
    }

    static navigationOptions = ({ navigation }) => {
        return ({
            title: `${navigation.state.params.comic.name}`,
        })
    };

    componentWillMount() {
        let comic = {};
        let datasource = '';
        const comicUrl = this.props.comicUrl;

        let criping = async () => {
            datasource = await fetchData(comicUrl);
            //----------------------------------
            const $ = cio.load(datasource);

            const mangaInfo = $('#infor-box');
            comic['name'] = mangaInfo.find('h1[itemprop=name]').text();
            comic['author'] = removeSpace(mangaInfo.find('span[itemprop=author] span[itemprop=name]').text());
            comic['inProcess'] = mangaInfo.find('.misc-infor a[href="/danh-sach-truyen/trang-thai/dang-tien-hanh"]').text();
            comic['latestChapter'] = mangaInfo.find('.misc-infor a[href="/danh-sach-truyen/trang-thai/dang-tien-hanh"]').parent().text().replace(/\D+/gi, '');
            comic['genre'] = [];
            comic['chapter'] = [];
            comic['image_src'] = mangaInfo.find('.manga-cover img').attr('src');

            $('#manga-chapter .chapter-name').each((index, chapter) => {
                comic['chapter'][index] = {};
                comic['chapter'][index].name = $(chapter).find('.chapter-name a').text().split(' ').find((word) => !isNaN(word[0]));
                comic['chapter'][index].link_url = $(chapter).find('.chapter-name a').attr('href');
            });

            $('#infor-box .misc-infor a[itemprop=genre]').each((index, genre) => {
                comic['genre'][index] = removeSpace($(genre).text());
            });

            comic['summary'] = $('#manga-summary').find('p').text();

            comic['rating'] = removeSpace($('#sidebar .multi-func-bar').find('#rating-point').text());
            comic['like'] = $('#sidebar .multi-func-bar').find('#voters').text().split('').find((word) => !isNaN(word[0]));

            this.props.dispatch(setComic(comic));

            this.setState({ comic });
            await this.validateComicSaved();
        }

        criping();
    }

    async validateComicSaved() {
        let result = await AsyncStorage.getAllKeys();
        result.forEach(async (key, index) => {
            let value = await AsyncStorage.getItem(key);
            let prased = JSON.parse(value);
            if (prased.name === this.state.comic.name)
                await this.setState({ saved: true });
        });
        this.setState({ isLoading: false });
    }

    onSelectedChapter(item) {
        const comic = this.state.comic;
        const { navigate, goBack } = this.props.navigation;
        this.props.dispatch(changeUrl(item.link_url));
        this.props.dispatch(setIndexCurrentComic(item.name - 1));
        navigate('Reader', { comic });
        // goBack();
    }

    async onSave() {
        let comicInfomation = {
            name: this.state.comic.name,
            url: this.props.comicUrl
        }

        if (!this.state.saved) {
            await AsyncStorage.setItem(`@ComicDetail:${comicInfomation.name}`, JSON.stringify(comicInfomation));
            this.props.dispatch(loveClick());
            this.setState({ saved: true })
        } else {
            await AsyncStorage.removeItem(`@ComicDetail:${comicInfomation.name}`);
            this.props.dispatch(loveClick());
            this.setState({ saved: false });
        }
    }

    render() {
        let loveStyle = this.state.saved ? [styles.iconStyle, { color: 'red' }] : styles.iconStyle;
        let comic = this.state.comic;

        if (this.state.isLoading) return <BallIndicator color='white'/>;

        return (
            <StyleProvider style={getTheme()} >
                <Container>
                    <Image style={[styles.backgroundImage]}
                        source={background} />
                    <View style={[styles.backgroundImage, styles.opacityBackground]}>
                    </View>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => { return this.props.navigation.goBack() }} >
                                <Icon name='ios-arrow-back' style={styles.iconStyle} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.textChapter}> {this.state.comic.name} </Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={this.onSave.bind(this)}>
                                <Icon ios='ios-heart' android='md-heart' style={loveStyle} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <NavigationBar
                            screenProps={{ comic, data: comic.chapter, type: "detail", onSelectItem: this.onSelectedChapter.bind(this) }} />
                        {/* <ListChapter data={this.state.comic.chapter} 
                            type='detail' 
                            onSelectItem={this.onSelectedChapter.bind(this)} /> */}
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    // layout in container
    container: {
        flex: 1,
        backgroundColor: '#49514A',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    iconStyle: {
        color: 'white',
        fontSize: 24,
    },
    textChapter: {
        color: 'white',
        fontWeight: "500",
    },
    opacityBackground: {
        backgroundColor: 'rgba(255, 255,255, 0.5)',
    }
});

const mapStateToProps = (state) => {
    return {
        comicUrl: state.comics.url,
        isLike: state.comics.likeClick,
    }
}

export default connect(mapStateToProps)(ComicDetail);