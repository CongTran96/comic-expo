import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableHighlight, Text } from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');

class Item extends React.PureComponent {
    state = {
       
    }

    onSelectedComic() {
        const { item, onPress } = this.props;
        onPress(item);
    }

    render() {
        let {name, image_src, older_date, older_chapter} = this.props.item;
        if (image_src === '') image_src='https://image.freepik.com/free-vector/geometric-background-with-text-of-coming-soon_1017-5069.jpg';

        return (
            <TouchableHighlight activeOpacity={0.8} underlayColor='rgba(255,255,255,0.7)'
                onPress={this.onSelectedComic.bind(this)}
                style={styles.container}
            >
                <View style={styles.listFlat}>
                    <Image source={{uri: `${image_src}`}} style={styles.imageFlat} />
                    <View style={styles.textView}>
                        <Text style={[styles.textComicName, styles.textColor]}>{name}</Text>
                        <Text style={[styles.textComicDate, styles.textColor]}>{older_date}</Text>
                    </View>
                    <Text style={[styles.textChapter, styles.textColor]}>{older_chapter}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;