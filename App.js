import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { store, actionTypes, stages, prompts } from './unjaniRedux'

import Requester from './Requester'
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

  getCheckboxFormPrompt() {
    const {stage} = this.state

    return (prompts[stage])
  }

  getCheckboxFormOptions() {
    const {stage} = this.state
   
    return (this.state.medicalInfo[stage].potential)
  }

  onPersonalDataChange = (gender, birthYear) => {
    store.dispatch({type: actionTypes.PERSONAL_DATA_CHANGE, payload: {gender: gender, birthYear: birthYear}}) 
  }

  onSelectOptions = (selectedIDs) => {
    store.dispatch({type: actionTypes.OPTIONS_SUBMITTED, payload: {selected: selectedIDs}})
    let requester = new Requester(this.state.gender, this.state.birthYear) 
    requester.get()
  }

  render() {
    let formToRender;
    let personalDataComponent; 

    if (this.state.stage == stages.PERSONAL_DATA) {
      formToRender = 
        <PersonalDataForm
          onFormSubmit={this.onPersonalDataChange}
        />
    } else if (this.state.isFetching) {
      formToRender = <ActivityIndicator animating={true} />
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
