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
        this.state = {
            nomeAluno: '',
            notaAluno: ''
        };
    }

    componentWillMount() {
        if (this.props.id) {
            const id = this.props.id;
            AsyncStorage.getItem("records").then((value) => {
                let list = JSON.parse(value);
                let record = null;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].uuid == id) {
                        record = list[i];
                        continue;
                    }
                }
                this.setState(record);

            }).done();
        }
    }

    onChange = (key, value) => {
        switch (key) {
            case 'nomeAluno':
                this.setState({ [key]: value });
                break;

            case 'notaAluno':
                this.setState({ [key]: value });
                break;
        }
    }

    save = () => {
        AsyncStorage.getItem("records").then((value) => {
            let list = JSON.parse(value);
            if (!Array.isArray(list)) {
                list = new Array();
            }
            if (this.state.uuid) {

                for (let i = 0; i < list.length; i++) {
                    if (list[i].uuid == this.state.uuid) {
                        list.splice(i, 1);//remove item
                        continue;
                    }
                }
            }

            const notas_model = {
                'uuid': this.guid(),
                'nomeAluno': this.state.nomeAluno,
                'notaAluno': this.state.notaAluno
            }
            list.push(notas_model);
            AsyncStorage.setItem("records", JSON.stringify(list));
            this.showSuccess();
            this.onChange('nomeAluno', '');
            this.onChange('notaAluno', '');

        }).done();
    }

    list = () => {
        Actions.formList();
    }

    showSuccess = () => {
        Alert.alert(
            'Notas app',
            'Salvo com sucesso!',
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )
    }


    guid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <View style={styles.containerImage}>
                    <Image source={require('../images/clown.png')} />
                </View>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                    <Text>Nome aluno</Text>
                    <TextInput
                        value={this.state.nomeAluno}
                        onChangeText={value => this.onChange('nomeAluno', value)}
                        placeholder=""
                        style={{ fontSize: 20, height: 45 }}
                    />
                    <Text>Nota</Text>
                    <TextInput
                        value={this.state.notaAluno}
                        onChangeText={value => this.onChange('notaAluno', value)}
                        placeholder=""
                        style={{ fontSize: 20, height: 45 }}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <Button title="Salvar" color="#115E54" onPress={() => this.save()} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Listar" style={{ marginTop: 20 }} color="#115E54" onPress={() => this.list()} />
                    </View>
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
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        margin: 5
    }
});