import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';

class Item extends React.PureComponent {

    render() {
        const { name, link_url } = this.props.item;
        const { onPress } = this.props;
        const item = this.props.item;

        return (
            <TouchableHighlight activeOpacity={0.8} underlayColor='rgba(255,255,255,0.7)'
                onPress={() => onPress(item)} 
            >
                <View style={styles.listBackground}>
                    <Text style={styles.textComic}>{ name }</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;