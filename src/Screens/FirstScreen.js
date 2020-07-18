import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class FirstScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchData: [],
            page: 1,
            isLoading: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
            refreshing: false
        }, this.getData)
    }

    getData = async () => {
        fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5&_page=' + this.state.page,)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    fetchData: this.state.fetchData.concat(responseJson),
                    isLoading: false,
                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            });
    }

    handleLoadMore = async () => {
        console.warn('LoadMore');
        console.log('Helloooo', this.state.page)
        this.setState({
            page: this.state.page + 1,
            isLoading: true
        }, this.getData)
    }

    renderFooter = () => {
        return (
            this.state.isLoading
                ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
                :
                null
        )
    }

    handleRefresh = () => {
        this.setState({
            page: this.state.page + 1,
            refreshing: true,
        }, () => {
            this.getData
            this.setState({
                refreshing: false
            })
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.fetchData}
                    showsVerticalScrollIndicator={false}
                    style={{ padding: 15 }}
                    keyExtractor={(index, item) => item.id}
                    onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={0}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    renderItem={({ item, index }) => (
                        <View>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Second', { PassDataToNext: item })}>
                                <View style={styles.mainView}>
                                    <View>
                                        <Image source={{ uri: item.url }}
                                            style={styles.thumbNail} />
                                    </View>
                                    <View style={styles.textViewStyles}>
                                        <Text style={styles.titleView}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingLeft:15,
        // paddingRight:15
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15,
        borderWidth: 0.5,
        overflow: 'hidden',
        borderColor: 'transparent',
        elevation: 5,
        padding: 10
    },

    thumbNail: {
        height: 70,
        width: 70,
        // backgroundColor: 'pink',
        borderRadius: 70 / 2
    },

    textViewStyles: {
        paddingLeft: 10,
        flex: 6
    },

    titleView: {
        color: 'black',
        fontSize: 13,
        fontWeight: '200'
    },

    loader: {
        marginTop: 10,
        alignItems: "center"
    },
});