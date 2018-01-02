import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { infoDevide } from '../styles';

const { width } = infoDevide;

class Item extends React.PureComponent {

    render() {
        const { name, link_url } = this.props.item;
        const { onPress, indexChapter } = this.props;

        return (
            <TouchableHighlight  activeOpacity={0.8} underlayColor='rgba(255,255,255,0.7)'
                onPress={() => onPress(this.props.item, indexChapter) }>
                <View style={styles.viewChapter}>
                    <Text style={styles.textChapter}>
                        <Icon name='ios-leaf' style={[styles.iconStyle, styles.leaf]} />  CHAP {name} </Text>
                    <Icon name='ios-bookmark-outline' style={[styles.iconStyle, styles.bookmark]} />
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;