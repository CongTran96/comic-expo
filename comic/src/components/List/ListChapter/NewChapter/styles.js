import { StyleSheet } from 'react-native';
import { infoDevide } from '../styles';

const { width } = infoDevide;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 1,
    },
    listFlat: {
        width: width - 20,
        padding: 10,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(126,126,126,0.80)',
    },
    imageFlat: {
      width: 50,
      height: 60,
    },
    textView: {
      flex: 1,
      paddingLeft: 10,
      alignItems: 'flex-start'
    },
    textComicName: {
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 7,
    },
    textComicDate: {
      fontSize: 12
    },
    textChapter: {
      paddingRight: 15,
      textAlign: 'right',
      fontWeight: '500',
      fontSize: 19
    },
    textColor: {
        color: '#fff',
    }
});

export default styles;