import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import propTypes from 'prop-types';
import ComicPage from './ComicPage';
import NewChapter from './NewChapter';
import DetailChap from './DetailChap';
import GenreCatelogy from './Genre';
import ComicSearch from './ComicSearch';

const { array, number, any, func, string } = propTypes;

class List extends Component {
    static propTypes = {
        data: any,
        onSelectItem: func,
        type: string
    }

    static defaultProps = {
        data: null,
        onSelectItem: emptyFunc,
        type: '',
    }

    _keyExtractor = (item, index) => index;

    renderItem({ item }) {
        const { type, onSelectItem } = this.props;            

        if (type === 'Reader') return <ComicPage item={item} />;
        if (type === 'NewChap') return <NewChapter item={item} onPress={onSelectItem} />;
        if (type === 'detail') return <DetailChap item={item} onPress={onSelectItem} />;
        if (type === 'gender') return <GenreCatelogy item={item} onPress={onSelectItem} />;
        if (type === 'SerchComic') return <ComicSearch item={item} onPress={onSelectItem} />
    }

    render() {
        const { data } = this.props;
        
        return (
            <FlatList
                keyExtractor={this._keyExtractor}
                data={data}
                renderItem={this.renderItem.bind(this)}
            />
        );
    }
}

function emptyFunc() {}

export default List;