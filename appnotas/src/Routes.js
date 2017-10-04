import React from 'react';
import {
  Scene,
  Router,
  Actions,
  Stack
} from 'react-native-router-flux';

import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';


export default props => (
  <Router>
    <Stack
      key="root"
      titleStyle={{ alignSelf: 'center' }}>

      <Scene key='formCadastro' component={FormComponent} title="Cadastro" />
      <Scene key='formList' component={ListComponent} title="Lista" />
    </Stack>
  </Router>
);


