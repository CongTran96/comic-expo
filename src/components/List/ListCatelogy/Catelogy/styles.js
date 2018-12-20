import { StyleSheet } from 'react-native';
import { infoDevide } from '../styles';

const { width } = infoDevide;

const styles = StyleSheet.create({
    scrollListItem: {
        width: (width - 10) / 3 - 10,
        height: 70,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(151,151,151,0.5)',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    }
})

export default styles;