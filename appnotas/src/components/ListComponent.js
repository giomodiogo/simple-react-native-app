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
        this.state = {
            list: []
        }

    }

    componentWillMount() {
        this.list();
    }

    list = () => {
        AsyncStorage.getItem("records").then((value) => {
            let list = JSON.parse(value);
            if (!Array.isArray(list)) {
                list = Array();
            }
            this.setState({ 'list': list });
        }).done();
    }

    onPressItem = (id) => {
        console.log("ID > " + id);
        Actions.formCadastro({ id: id });
    }

    remove = (id) => {
        console.log("REMOVE <")
        this.setState(
            prevState => {
                let list = prevState.list;

                for (let i = 0; i < list.length; i++) {
                    if (list[i].uuid == id) {
                        list.splice(i, 1);//remove item
                        continue;
                    }
                }

                return { list: list };
            },
            () => {
                AsyncStorage.setItem("records", JSON.stringify(this.state.list));
                this.showSuccess();
            }
        );
    }

    showSuccess = () => {
        Alert.alert(
            'Notas app',
            'Removido com sucesso!',
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )
    }


    render() {
        return (
            <View>
                <ScrollView
                    keyboardShouldPersistTaps='always'
                >
                    {this.state.list.map(item => (
                        <TouchableHighlight key={item.uuid} onPress={() => this.onPressItem(item.uuid)}>
                            <View style={styles.item} >
                                <Text>{item.nomeAluno} - {item.notaAluno}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Button title="Remover" color="#115E54"
                                        onPress={() => this.remove(item.uuid)}
                                    />
                                </View>


                            </View>
                        </TouchableHighlight>
                    ))}
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

