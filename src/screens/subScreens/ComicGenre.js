import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {
    StyleProvider, Button, Container, Header, Left, Right,
    Content, Body, Title, Icon, Footer, FooterTab
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import { connect } from 'react-redux';
import cio from 'cheerio-without-node-native';
import { changeUrl, genreSelect } from '../../reducers/modules/comics/actions';
import ListChapter from '../../components/List/ListChapter';
import fetchData from '../../extends/FetchData';

const background = require('../../assets/lover_butterfly.jpg');

class ComicGenre extends Component {
    state = {
        genre: [],
    }

    componentDidMount() {
        let datasource = '';
        let genre = [];
        const link = 'http://truyentranhtuan.com/danh-sach-truyen/';

        let criping = async () => {
            datasource = await fetchData(link);
            //----------------------------------
            const $ = cio.load(datasource);

            // handle to add data here

            $('.category.clearfix ul li').each((index, element) => {
                genre[index] = {};
                genre[index].name = $(element).find('a').text();
                genre[index].link_url = $(element).find('a').attr('href');
            });

            // remember setstate
            this.setState({ genre });
        }

        criping();
    }

    onSelectItem(item) {
        const { name, link_url } = item;
        const { navigate } = this.props.navigation;
        this.props.dispatch(changeUrl(link_url));
        this.props.dispatch(genreSelect(true));
        navigate('GerneDetail', { genre: { name } });
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
                            <Title style={{ color: 'white' }}>
                                Thể Loại
                            </Title>
                        </Body>
                        <Right>
                            <Button transparent
                                onPress={() => { this.props.navigation.navigate('Search') }} >
                                <Icon name='search' style={styles.icon} />
                            </Button>
                        </Right>
                    </Header>
                    <Content >
                        <ListChapter data={this.state.genre}
                            type='gender'
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
    opacityBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    icon: {
        fontSize: 28,
        color: '#fff',
        marginTop: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        comicUrl: state.comics.url,
    }
}

export default connect(mapStateToProps)(ComicGenre);