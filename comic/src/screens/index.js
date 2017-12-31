import React, { Component } from 'react';
import { Easing, Animated } from 'react-native';
import { Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { changeUrl } from '../reducers/modules/comics/actions';
import { ComicHome, ComicReader, ComicDetail, ListComic, ComicGenre, LoveComic, InformationComic, SearchComic, Loading } from './subScreens';

export const tabScreens = TabNavigator({
  Load: { screen: Loading },
  Home: { screen: ComicHome },
  List: { screen: ListComic },
  Genre: { screen: ComicGenre },
  Love: { screen: LoveComic },
  Search: { screen: SearchComic },
}, {
    tabBarPosition: "bottom",
    animationEnabled: false,
    lazy: false,
    tabBarComponent: props => {
      return (
        <StyleProvider style={getTheme()}>
          <Footer >
            <FooterTab>
              <Button vertical onPress={() => props.navigation.navigate('Home')}>
                <Icon active={props.navigationState.index === 0}
                  name="ios-home-outline" style={{ color: 'white' }} />
              </Button>
              <Button vertical onPress={() => props.navigation.navigate('List')}>
                <Icon active={props.navigationState.index === 1}
                  name="ios-book-outline" style={{ color: 'white' }} />
              </Button>
              <Button vertical onPress={() => props.navigation.navigate('Genre')}>
                <Icon name="ios-text-outline" style={{ color: 'white' }} />
              </Button>
              <Button vertical onPress={() => props.navigation.navigate('Love')}>
                <Icon name="heart" style={{ color: 'white' }} />
              </Button>
            </FooterTab>
          </Footer>
        </StyleProvider>
      );
    }
  });

const AppNavigator = StackNavigator({
  TabScreens: { screen: tabScreens },
  Detail: { screen: ComicDetail },
  Reader: { screen: ComicReader },
  GerneDetail: { screen: ListComic },
  Info: { screen: InformationComic }
}, {
    headerMode: 'none',
    initialRouteName: 'TabScreens',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: true,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX }] };
      },
    }),
  });

export default connect()(AppNavigator);