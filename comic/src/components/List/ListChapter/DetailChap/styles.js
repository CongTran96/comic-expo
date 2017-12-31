import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    viewChapter: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(126,126,126,0.8)',
    },
    textChapter: {
        color: 'white',
        fontWeight: "300",
    },
    iconStyle: {
        color: 'white',
        fontSize: 24,
    },
    leaf: {
        fontSize: 15, 
        color: 'rgba(102, 236, 74, 0.8)',
    },
    bookmark: {
        fontSize: 20, 
        opacity: 0.95,
    }
});

export default styles;