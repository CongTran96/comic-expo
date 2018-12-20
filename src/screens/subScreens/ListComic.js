import React, { Component } from 'react';
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import {
    StyleProvider, Button, Container, Header, Left, Right,
    Content, Body, Title, Icon, Footer, FooterTab
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import { connect } from 'react-redux';
import cio from 'cheerio-without-node-native';
import { changeUrl, saveListcomic } from '../../reducers/modules/comics/actions';
import { mapArrayToDataSection } from '../../extends/Array';
import LinearGradient from 'react-native-linear-gradient';
import ComicList from '../../components/ComicList';
import fetchData from '../../extends/FetchData';

const background = require('../../assets/lover_butterfly.jpg');

class ListComic extends Component {
    static navigationOptions = {
        tabBarVisible: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            comic: [],
            page: 0,
            data: [],
            isGenerDetail: false,
        }
    }

    // static navigationOptions = ({ navigation }) => ({
    //     title: `${navigation.state.params.comic.name}`,
    // });

    generatorlinkComic = (link) => {
        this.setState({ isGenerDetail: true });
        return `http://truyentranhtuan.com${link}`
    }

    componentWillMount() {
        let datasource = '';
        let comic = [];

        const nativeTabbarlink = 'http://truyentranhtuan.com/danh-sach-truyen/';
        const link = (this.props.isGenreSelect) ? this.generatorlinkComic(this.props.comicUrl) : nativeTabbarlink;

        let criping = async () => {
            datasource = await fetchData(link);
            //----------------------------------
            const $ = cio.load(datasource);

            // handle to add data here

            $('#new-chapter .manga-focus').each((index, element) => {
                comic[index] = {};
                comic[index].name = $(element).find('.manga a').text();
                comic[index].link_url = $(element).find('.manga a').attr('href');
            });

            this.props.dispatch(saveListcomic(comic));

            if(!this.props.isGenreSelect) 
                await AsyncStorage.setItem(`@ListComic:comics`, JSON.stringify(comic));

            comic = mapArrayToDataSection(comic);

            let data = comic[0];

            // remember setstate
            this.setState({ comic, data, page: this.state.page++ });
        }

        try {
            criping();
        } catch (error) {
            console.log(error);
        }
    }

    onSelectedItem(item) {
        const { name, link_url } = item;
        const { navigate } = this.props.navigation;
        this.props.dispatch(changeUrl(link_url));
        navigate('Detail', { comic: { name } });
    }

    makeRenderNextPage = () => {
        const { comic, data, page } = this.state;
        this.setState({
            data: [...data, ...comic[page + 1]],
            page: page + 1
        })
    }

    renderBackButton = () => {
        return (
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()} >
                    <Icon name='ios-arrow-back' style={styles.icon} />
                </Button>
            </Left>
        );
    }

    render() {
        const backButton = this.state.isGenerDetail ? this.renderBackButton() : <Left />;

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
                        {backButton}
                        <Body>
                            <Title style={styles.title}>
                                Danh sách truyện
                            </Title>
                        </Body>
                        <Right>
                            {
                                this.props.isGenreSelect ? null :
                                    <Button transparent
                                        onPress={() => { this.props.navigation.navigate('Search') }} >
                                        <Icon name='search' style={styles.icon} />
                                    </Button>
                            }
                        </Right>
                    </Header>
                    <View style={{ flex: 1 }} >
                        <ComicList data={this.state.data}
                            makeRenderNextPage={this.makeRenderNextPage.bind(this)}
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
        comicUrl: state.comics.url,
        isGenreSelect: state.comics.isGenreSelect,
    }
}

export default connect(mapStateToProps)(ListComic);