import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

class TestScreen extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is the TestScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 23,
        fontWeight: '400',
    }
})

const mapStateToProps = (state) => {
    return {
        comicUrl: state.comics.url,
    }
}

export default connect(mapStateToProps)(TestScreen);
