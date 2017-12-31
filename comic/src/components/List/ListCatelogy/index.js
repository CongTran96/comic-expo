import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import propTypes from 'prop-types';
import Catelogy from './Catelogy';

const { any, func } = propTypes;

class ListCatelogy extends Component {
    static propTypes = {
        data: any,
        onSelectItem: func,
    }

    static defaultProps = {
        data: null,
        onSelectItem: emptyFunc,
    }

    renderCatelogy(catelogy, index) {
        const { onSelectItem } = this.props;

        return <Catelogy item={catelogy} onPress={onSelectItem} key={index} />
    }

    render() {
        const { data } = this.props;

        return (
            <View style={styles.scrollList}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    data.map((catelogy, index) => this.renderCatelogy(catelogy, index))
                }
                </ScrollView>
            </View>
        );
    }
}

function emptyFunc() {}

export default ListCatelogy;