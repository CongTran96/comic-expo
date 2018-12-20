import React, { Component } from 'react';
import { View, Text, SectionList } from 'react-native';
import styles from './styles';
import propTypes from 'prop-types';
import Comic from './Comic';

const { any, func } = propTypes;

class ComicList extends Component {
    static propTypes = {
        data: any,
        onSelectItem: func,
        makeRenderNextPage: func,
    }

    static defaultProps = {
        data: null,
        onSelectItem: emptyFunc,
        makeRenderNextPage: emptyFunc,
    }

    _keyExtractor = (item, index) => index;

    renderTitle({ section }) {
        return (
            <View style={{backgroundColor: 'rgba(126,126,126,0.80)'}}>
                <View style={styles.backgroundTitle}>
                    <Text style={styles.textTitle}> {section.title} </Text>
                </View>
            </View>
        );
    }

    renderItem({ item }) {
        const { onSelectItem } = this.props;
        return <Comic item={item} onPress={onSelectItem} />
    }

    render() {
        const { data, makeRenderNextPage } = this.props;

        return (
            <View style={{flex: 1}} >
                <SectionList
                    keyExtractor={this._keyExtractor}
                    sections={data}
                    renderItem={this.renderItem.bind(this)} 
                    renderSectionHeader={this.renderTitle.bind(this)} 
                    onMomentumScrollEnd={() => makeRenderNextPage()}
                    refreshing={false}
                    onRefresh={() => {}}
                    onEndReached={() => {}}
                    onEndReachedThreshold={-0.5}
                    initialNumToRender={10}
                />
            </View>
        );
    }
}

function emptyFunc() {}

export default ComicList;