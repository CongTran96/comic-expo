import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Content, FooterTab,
  Footer, Body, Text, Left, Right, Button, Title, Icon, StyleProvider
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import cio from 'cheerio-without-node-native';
import { changeUrl, genreSelect } from '../../reducers/modules/comics/actions';
import { displayMax } from '../../extends/String';
import fetchData from '../../extends/FetchData';
import ListChapter from '../../components/List/ListChapter';
import ListCatelogy from '../../components/List/ListCatelogy';
import { BallIndicator } from 'react-native-indicators';

const { width, height } = Dimensions.get('window');
const background = require('../../assets/art_amazing.jpg');

console.disableYellowBox = true;

class Home extends Component {
  static navigationOptions = {
    tabBarVisible: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      catelogy: [1, 2, 3, 4, 5],
      isLoading: true,
    };
    this.onLoading = new Animated.Value(0);
  }

  // loading() {
  //   this.onLoading.setValue(0);
  //   Animated.timing(
  //     this.onLoading, 
  //     {
  //       toValue: 1,
  //       duration: 2000,
  //       easing: Easing.linear
  //     }
  //   ).start(() => {this.setState({ isLoading: false })});
  // }

  componentDidMount() {
    let data = [];
    let datasource = '';
    const homepageUrl = this.props.homepageUrl;

    let criping = async () => {
      datasource = await fetchData('http://truyentranhtuan.com/');
      //----------------------------------
      const $ = cio.load(datasource);
      $('#story-icon.hidden .new-update').each(function (index, manga) {
        data[index] = {};

        // get data on 'truyetranhtuan.com' to json 
        // name has replace by method because just for remove space
        data[index]['name'] = displayMax($(manga).find('.manga-update-name').text(), 50);
        data[index]['older_chapter'] = $(manga).find('.manga-update-chapter').text().replace(/Chương/i, '');
        data[index]['older_date'] = $(manga).find('.manga-update-date').text();
        data[index]['image_src'] = $(manga).find('img').attr('src');
        data[index]['link_url'] = $(manga).find('.manga-update-name').attr('href');
      });
      this.setState({ data });
    }

    criping();
    // this.loading();
  }

  onSelectedComic(comic) {
    const { name, link_url } = comic;
    const { navigate } = this.props.navigation;
    this.props.dispatch(changeUrl(link_url));
    navigate('Detail', { comic });
    // navigate('Info', { comic: { name } });
  }

  onCatelogySelect(index) {
    if (index === 1) {

        const name = 'Trinh Thám';
        this.props.dispatch(changeUrl('/danh-sach-truyen/the-loai/shounen'));
        this.props.dispatch(genreSelect(true));
        this.props.navigation.navigate('GerneDetail', { genre: { name } });

    } else if ( index === 2) {

      const name = 'Việt Nam';
      this.props.dispatch(changeUrl('/danh-sach-truyen/the-loai/truyen-tranh-viet-nam'));
      this.props.dispatch(genreSelect(true));
      this.props.navigation.navigate('GerneDetail', { genre: { name } });

    } else if ( index === 3) {

      const name = 'School Life';
      this.props.dispatch(changeUrl('/danh-sach-truyen/the-loai/school-life'));
      this.props.dispatch(genreSelect(true));
      this.props.navigation.navigate('GerneDetail', { genre: { name } });

    } else if ( index === 4) {

      const name = 'Drama';
      this.props.dispatch(changeUrl('/danh-sach-truyen/the-loai/drama'));
      this.props.dispatch(genreSelect(true));
      this.props.navigation.navigate('GerneDetail', { genre: { name } });

    } else {

      const name = 'Best Comic';
      this.props.dispatch(changeUrl('/danh-sach-truyen/top/top-50'));
      this.props.dispatch(genreSelect(true));
      this.props.navigation.navigate('GerneDetail', { genre: { name } });

    }
  }

  render() {
    // if (this.state.isLoading) return <BallIndicator color='white' />

    return (
      <StyleProvider style={getTheme()}>
        <Container >
          <Image source={background}
            style={styles.backgroundImage} />
          <View style={[styles.backgroundImage, { backgroundColor: 'rgba(83,103,69,0.1)' }]} />
          <Header>
            <Left />
            <Body>
              <Title style={{ color: 'white' }}>
                Home
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
            <ListCatelogy data={this.state.catelogy}
              onSelectItem={this.onCatelogySelect.bind(this)} />
            <ListChapter data={this.state.data}
              type='NewChap'
              onSelectItem={this.onSelectedComic.bind(this)} />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  icon: {
    fontSize: 28,
    color: '#fff',
    marginTop: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    homepageUrl: state.comics.url,
  };
}

export default connect(mapStateToProps)(Home);