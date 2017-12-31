import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import ComicInstruction from '../components/InstructionDetail';
import ListChapter from '../components/List/ListChapter';
import InformationComic from './subScreens/InformationComic';

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        render() {
            return <SomeComponent {...this.props.screenProps} />
        }
    }
}

const tabScreens = TabNavigator({
    Info: { screen: mapNavigationStateParamsToProps(InformationComic) },
    Chapter: { screen: mapNavigationStateParamsToProps(ListChapter) },
}, {
        tabBarPosition: "top",
        animationEnabled: false,
        lazy: true,
        tabBarComponent: props => {
            return (
                <ComicInstruction comic={props.screenProps.comic}
                    onSelectInfor={() => {
                        return props.navigation.navigate('Info');
                    }}
                    onSelectDetail={() => {
                        return props.navigation.navigate('Chapter');
                    }} />
            );
        }
    });

export default connect()(tabScreens);