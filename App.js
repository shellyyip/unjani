import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { store, actionTypes, stages } from './unjaniRedux'

import PersonalDataForm from './PersonalDataForm'
import CheckboxForm from './CheckboxForm'

export default class App extends React.Component {
  PROMPTS = {
    BODY_LOCATION: 'Which part of your body hurts?'
  }  

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

  getCheckboxFormPrompt() {
    const {stage} = this.state

    return (this.PROMPTS[stage])
  }

  getCheckboxFormOptions() {
    const {stage} = this.state
    
    return (this.state.medicalInfo[stage].potential)
  }

  onPersonalDataChange = (gender, birthYear) => {
    store.dispatch({type: actionTypes.PERSONAL_DATA_CHANGE, payload: {gender: gender, birthYear: birthYear}}) 
  }

  onSelectOptions = (selectedIDs) => {
  }

  render() {
    let formToRender;
    let personalDataComponent; 

    if (this.state.stage == stages.PERSONAL_DATA) {
      personalDataComponent = undefined;
      formToRender = 
        <PersonalDataForm
          onFormSubmit={this.onPersonalDataChange}
        />
    } else {
      formToRender = <CheckboxForm onFormSubmit={this.onSelectOptions} prompt={this.getCheckboxFormPrompt()} allOptions={this.getCheckboxFormOptions()} />;
      personalDataComponent = <Text> Gender: {this.state.gender} Birth Year: {this.state.birthYear} </Text>
    }    

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
