import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollList: {
        margin: 5,
        width: width - 10,
        height: 80,
    },
})

export const infoDevide = Dimensions.get('window');
export default styles;