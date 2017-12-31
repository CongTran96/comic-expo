import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class Item extends Component {

    render() {
        const {name, author, inProcess, latestChapter} = this.props.comic;
        const {onSelectDetail} = this.props;
        const {onSelectInfor} = this.props;        
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onSelectInfor}>
                    <Text style={styles.text}>Thông tin truyện</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSelectDetail}>
                    <Text style={styles.text}>Danh sách chapter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Item;