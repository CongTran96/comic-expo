import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const { func, any } = PropTypes;
let infoDevide;
const linkCaptionImage = [
    '../../../../assets/genre_0.png',
    '../../../../assets/genre_1.png',
    '../../../../assets/genre_2.png',
    '../../../../assets/genre_3.png',
    '../../../../assets/genre_4.png'
];

class Item extends Component {
    static propTypes = {
        onPress: func,
        infoDevide: any,
    }

    static defaultProps = {
        onPress: emptyFunc,
        infoDevide: null,
    }

    constructor(props) {
        super(props);
        if (this.props.infoDevide)
            infoDevide = this.props.infoDevide;
    }

    requireImage() {
        const { item } = this.props;
        let image_link = '';
        if (item === 1) image_link = require('../../../../assets/genre_0.png');
        if (item === 2) image_link = require('../../../../assets/genre_1.png');
        if (item === 3) image_link = require('../../../../assets/genre_2.png');
        if (item === 4) image_link = require('../../../../assets/genre_3.png');
        if (item === 5) image_link = require('../../../../assets/genre_4.png');

        return image_link;
    }

    render() {
        const { onPress, item } = this.props;
        return (
            <TouchableOpacity underlayColor='purple'
                onPress={() => { onPress(item) }} >
                <View>
                    <Image style={styles.scrollListItem}
                        source={this.requireImage()} />
                </View>
            </TouchableOpacity>
        );
    }
}

function emptyFunc() {}

export { infoDevide };
export default Item;