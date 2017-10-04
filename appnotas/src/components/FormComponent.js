import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    AsyncStorage,
    StyleSheet,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class FormComponent extends Component {

    constructor(props) {
        super();
    }   

    /*guid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }*/

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <View style={styles.containerImage}>
                    <Image source={require('../images/clown.png')} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerImage: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});