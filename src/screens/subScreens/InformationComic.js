import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image } from 'react-native';
import { StyleProvider, Button, Container, Header, Left, Right, Content, Body, Title, Icon, AnimationButton } from 'native-base';
import fetchData from '../../extends/FetchData';
import cio from 'cheerio-without-node-native';
import getTheme from '../../../native-base-theme/components';
import ComicInstruction from '../../components/InstructionDetail';
import { connect } from 'react-redux';
import { removeSpace } from '../../extends/String';
import { changeUrl, saveItem } from '../../reducers/modules/comics/actions';

class InfomationComic extends Component {
    state = {
        comic: {},
    }

    componentWillMount() {
        this.setState({ comic: this.props.comic });
    }

    renderGenre = (genres = []) => {
        return genres.map(function (value, index) {
            if (index == 0)
                return (
                    <View key={index}>
                        <Text style={{ color: "white", fontSize: 18 }}>
                            {value}
                        </Text>
                    </View>
                )
            else
                return (
                    <View key={index}>
                        <Text style={{ color: "white", fontSize: 18 }}>
                            {', ' + value}
                        </Text>
                    </View>
                )

        });
    }

    render() {
        let loveStyle = this.state.saved ? [styles.iconStyle, { color: 'red' }] : styles.iconStyle;

        return (
            <View>
                <View style={[styles.backgroundImage, styles.opacityBackground]} />
                <View style={styles.image_src}>
                    <Image style={[styles.circle]}
                        source={{ uri: this.state.comic.image_src }} />
                    <Text style={styles.textName}> {this.state.comic.name} </Text>
                </View>
                <View style={styles.socialIcons}>
                    <View style={styles.socialIcon}>
                        <Icon style={{ color: 'white', fontSize: 40 }} name='star' />
                        <View style={{
                            flexDirection: "column",
                            justifyContent: "flex-start"
                        }}>
                            <Text style={{
                                paddingLeft: 15,
                                color: 'white',
                                fontWeight: "bold",
                                fontSize: 20
                            }}>
                                {this.state.comic.rating}
                            </Text>

                            <Text style={{
                                paddingLeft: 15,
                                color: "#aaa",
                                fontSize: 16
                            }}>
                                Rating
                                    </Text>
                        </View>
                    </View>
                    <View style={[styles.socialIcon, styles.centerSocialIcon]}>
                        <Icon style={{ color: 'white', fontSize: 40 }} name='md-share' />
                        <View style={{
                            flexDirection: "column",
                            justifyContent: "flex-start"
                        }}>
                            <Text style={{
                                paddingLeft: 15,
                                color: 'white',
                                fontWeight: "bold",
                                fontSize: 20
                            }}>
                                20
                                        </Text>

                            <Text style={{
                                paddingLeft: 15,
                                color: "#aaa",
                                fontSize: 16
                            }}>
                                Shares
                                        </Text>
                        </View>
                    </View>
                    <View style={styles.socialIcon}>
                        <Icon style={{ color: 'white', fontSize: 40 }} name='thumbs-up' />
                        <View style={{
                            flexDirection: "column",
                            justifyContent: "flex-start"
                        }}>
                            <Text style={{
                                paddingLeft: 15,
                                color: 'white',
                                fontWeight: "bold",
                                fontSize: 20
                            }}>
                                {this.state.comic.like}
                            </Text>

                            <Text style={{
                                paddingLeft: 15,
                                color: "#aaa",
                                fontSize: 16
                            }}>
                                Likes
                                        </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.comicInfo}>
                    <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: "#aaa" }}>
                        <Text style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 10, fontSize: 21, color: 'white', }}>
                            Thông tin truyện
                                </Text>
                    </View>
                    <View style={{ paddingTop: 10, paddingLeft: 10, flexDirection: "column", justifyContent: "flex-start" }}>
                        <View style={{ paddingBottom: 5, flexDirection: "row" }}>
                            <Text style={{ color: "#aaa", fontSize: 18 }}>
                                {"Tác giả:  "}
                            </Text>
                            <Text style={{ color: "white", fontSize: 18 }}>
                                {this.state.comic.author}
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 5, flexDirection: "row" }}>
                            <Text style={{ color: "#aaa", fontSize: 18 }}>
                                {"Thể loại:  "}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                {this.renderGenre(this.state.comic.genre)}
                            </View>
                        </View>
                        <View style={{ paddingBottom: 5, flexDirection: "row" }}>
                            <Text style={{ color: "#aaa", fontSize: 18 }}>
                                {"Chương mới nhất:  "}
                            </Text>
                            <Text style={{ color: "white", fontSize: 18 }}>
                                {this.state.comic.latestChapter}
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 20, flexDirection: "row" }}>
                            <Text style={{ color: "#aaa", fontSize: 18 }}>
                                {"Trạng thái:  "}
                            </Text>
                            <Text style={{ color: "white", fontSize: 18 }}>
                                {this.state.comic.inProcess}
                            </Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            {this.state.comic.summary}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    // layout in container
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginTop: 10,
        marginBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#49514A',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    iconStyle: {
        color: 'white',
        fontSize: 24,
    },
    textChapter: {
        color: 'white',
        fontWeight: "500",
    },
    opacityBackground: {
        backgroundColor: 'rgba(0, 0,0, 0.8)',
    },
    image_src: {
        alignItems: 'center',
    },
    textName: {
        color: 'white',
        fontSize: 30,
        paddingBottom: 10,
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    socialIcon: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    centerSocialIcon: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    }
});

export default InfomationComic;