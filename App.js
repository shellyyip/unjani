import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { store, actionTypes, stages } from './unjaniRedux'

import PersonalDataForm from './PersonalDataForm'
import CheckboxForm from './CheckboxForm'

export default class App extends React.Component {
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

  getCheckboxFormOptions() {
    const {stage} = this.state

    console.log(stage)
    console.log(this.state.medicalInfo)
    
    return (this.state.medicalInfo[stage].potential)
  }

  onPersonalDataChange = (gender, birthYear) => {
    store.dispatch({type: actionTypes.PERSONAL_DATA_CHANGE, payload: {gender: gender, birthYear: birthYear}}) 
  }

  onSymptomsChange = (newSymptoms) => {
    
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
      formToRender = <CheckboxForm onFormSubmit={this.onSymptomsChange} allOptions={this.getCheckboxFormOptions()} />;
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
