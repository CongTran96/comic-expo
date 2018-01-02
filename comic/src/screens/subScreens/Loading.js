//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

// create a component
class Loading extends Component {
    static navigationOptions = {
        tabBarVisible: false,
    };

    constructor() {
        super();
        state = {
            isLoading: true,
        }
        this.onLoading = new Animated.Value(0);
    }

    loading() {
        this.onLoading.setValue(0);
        Animated.timing(
            this.onLoading,
            {
                toValue: 1,
                duration: 3000,
            }
        ).start(() => {
            this.setState({isLoading: false});
            this.props.navigation.navigate('Home');
        });
    }

    async clearDataAsyncStorage() {
        AsyncStorage.clear();
        let value = await AsyncStorage.getAllKeys();
        console.log(value);
        console.log('all done');
    }

    async getAllKeys() {
        let result = await AsyncStorage.getAllKeys();
        console.log(result);
    }

    componentDidMount() {
        this.loading();
        // this.getAllKeys();
        // this.clearDataAsyncStorage();
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/Pikachu_Go.gif')} style={styles.image}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        transform: [{
            scale: 0.75,
        }]
    }
});

//make this component available to the app
export default connect()(Loading);
