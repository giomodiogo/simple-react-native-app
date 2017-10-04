import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Alert,
    AsyncStorage,
    ScrollView,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class ListComponent extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <View>
                <ScrollView keyboardShouldPersistTaps='always'                >

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        borderColor: '#999',
        padding: 20,
        flexDirection: 'row'
    }
});

