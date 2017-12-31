import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import styles from './styles';
import { infoDevide } from '../styles';

const { width } = infoDevide;

class Item extends React.PureComponent {
    state = {
        widthDevideHeight: 0.7,
        isLoading: true,
    }

    renderLoading() {
        const { isLoading } = this.state;

        if (isLoading) return <ActivityIndicator style={styles.loading} color='white' size='large' />
    }

    render() {
        const url = this.props.item;

        return (
            <View style={styles.container}>
                <ImageZoom cropWidth={width}
                        cropHeight={width / this.state.widthDevideHeight}
                        imageWidth={width}    
                        imageHeight={width / this.state.widthDevideHeight }>
                    <Image source={{uri: `${url}`}} 
                        style={[styles.image, {width, height: width / this.state.widthDevideHeight}]}
                        onLoadEnd={() => this.setState({isLoading: false})}
                    />
                </ImageZoom>
                { this.renderLoading() }
            </View>
        );
    }
}

export default Item;