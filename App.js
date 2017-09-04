import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStore } from 'redux'
import { reducer, actionTypes } from './unjaniRedux'

import PersonalDataForm from './PersonalDataForm'
import CheckboxForm from './CheckboxForm'

export default class App extends React.Component {
  const store = createStore(reducer)
 
  state = {}  

  componentWillMount() {
    this.setState(store.getState())

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }
 
  componentWillUnmount() {
    this.unsubscribe()
  }

  onPersonalDataChange = (gender, birthYear) => {
    store.dispatch(type: actionTypes.PERSONAL_DATA_CHANGE, payload: {gender: gender, birthYear: birthYear}) 
  }

  onSymptomsChange = (newSymptoms) => {
    
  }

  render() {
    let formToRender = <CheckboxForm onFormSubmit={this.onSymptomsChange} />;
    let personalDataComponent = <Text> Gender: {this.state.gender} Birth Year: {this.state.birthYear} </Text> 

    if (this.state.gender == undefined || this.state.birthYear == undefined) {
      personalDataComponent = undefined;
      formToRender = 
        <PersonalDataForm
          onFormSubmit={this.onPersonalDataChange}
        />
    };    

    return (    
      <View style={styles.container}>
        <Text style={styles.title}>Unjani</Text>
        {personalDataComponent} 
        {formToRender}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
