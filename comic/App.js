import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/screens/index'; 
import store from './src/stores';
import TestScreen from './src/screens/subScreens/TestScreen';

// neu muon test screen thi de la true nghuoc lai de la false
const isTest = false;

// Neu test screen Infomation thi de InfomationComic vao nghuoc lai thi de LoveComic
// Vi du o day se test screen InfomationComic
const screenTest = <TestScreen />;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    const Screen = (isTest) ? screenTest : <AppNavigator />;

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
      
    return (
      <Provider store={store}>
        { Screen }
      </Provider>
    );
  }
}