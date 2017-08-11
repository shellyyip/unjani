import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PersonalDataForm from './PersonalDataForm'
import CheckboxForm from './CheckboxForm'

export default class App extends React.Component {
  state = {
    gender: undefined, 
    birthYear: undefined
  }  

  render() {
    let componentToRender = <CheckboxForm/>;
 
    if (this.state.gender == undefined || this.state.birthYear == undefined) {
      componentToRender = <PersonalDataForm/>
    };    

    return (    
      <View style={styles.container}>
        <Text>Unjani</Text>
        {componentToRender}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
