import React, { Component } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, Header, Left, Right, Body, Icon, Button, Title, Spinner } from 'native-base';
import ListChapter from '../../components/List/ListChapter';
import fetchData from '../../extends/FetchData';
import { changeUrl, setIndexCurrentComic } from '../../reducers/modules/comics/actions';

class ComicReader extends Component {
    static navigationOptions = {
        title: 'Reading Comic',
    };

    state = {
        comicUrl: '',
    }

    async criping() {

        let arrayImageSrc = (data) => {
            let regularExcFirst = /slides_page_url_path/i;
            let regularExcLast = /slides_page_url_path.length/i;

            let indexFirst = regularExcFirst.exec(data).index;
            let indexLast = regularExcLast.exec(data).index;

            let rawValue = data.substring(indexFirst, indexLast);
            let rawValueArray = rawValue.substring(rawValue.indexOf('[') + 1, rawValue.indexOf(']')).split(',');

            let finalValueArray = rawValueArray.map((element) => {
                let regRemoveN = /"/gi;
                return element.replace(regRemoveN, '');
            })

            return finalValueArray;
        }

        // save data to the property comicUrl of state 

        let dataComicPaper = await fetchData(this.props.linkComic);
        let comicUrl = await arrayImageSrc(dataComicPaper);

        this.setState({ comicUrl });

    }

    componentDidMount() {
        try {
            this.criping();
        } catch (error) {
            console.log(error);
        }
    }

    async goNextChap() {
        let chapter = this.props.comic.chapter;
        if (this.props.indexCurrentComic === 0){
            console.log('running');
            Alert.alert(
                `Chưa có chap mới hơn! Bạn đợi thêm nhé ^.^`
            )}
        else {
            let nextComic = chapter[this.props.indexCurrentComic - 1];
            await this.props.dispatch(changeUrl(nextComic.link_url));
            await this.props.dispatch(setIndexCurrentComic(parseInt(this.props.indexCurrentComic - 1)));
            this.criping();
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon name='ios-arrow-back' style={[styles.iconStyle]} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.title}> {this.props.navigation.state.params.comic.name} </Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => { this.goNextChap() }} >
                            <Text style={styles.nextChap}> Next Chap </Text>
                            <Icon name='ios-arrow-forward' style={[styles.iconStyle, { color: '#fff' }]} />
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <ListChapter data={this.state.comicUrl} type='Reader' />
                </Content>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    iconStyle: {
        color: 'white',
        fontSize: 24,
    },
    content: {
        backgroundColor: '#434541',
    },
    heart: {
        color: '#CF3E4A',
    },
    title: {
        color: '#fff',
    },
    nextChap: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    return {
        linkComic: state.comics.url,
        indexCurrentComic: state.comics.index,
        comic: state.comics.comic,
    };
}

export default connect(mapStateToProps)(ComicReader);