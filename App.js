import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { store, actionTypes, stages, stagesKeys, prompts } from './unjaniRedux'

import Requester from './Requester'
import Authenticator from './Authenticator'
import PersonalDataForm from './PersonalDataForm'
import CheckboxForm from './CheckboxForm'
import List from './List'
import Breadcrumbs from './Breadcrumbs'

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
  
  checkValidateOneOption() {
    const {stage} = this.state

    return (stage === stages.BODY_LOCATION || stage === stages.BODY_SUBLOCATION)
  }

  getExistingMedicalInfo() {
    const {medicalInfo} = this.state;
    const orderedKeys = stagesKeys.filter((n) => { return (Object.keys(medicalInfo).includes(n) && medicalInfo[n].selectedNames) })
    return (orderedKeys.map((k) => {return ({identifier: k, item: medicalInfo[k].selectedNames.join(", ")})}))
  }
  
  getPrompt() {
    const {stage} = this.state

    return (prompts[stage])
  }

  getCheckboxFormOptions() {
    const {stage} = this.state
   
    return (this.state.medicalInfo[stage].potential)
  }

  onBreadcrumbSelection = (stage) => {
    store.dispatch({type: actionTypes.PREVIOUS_STAGE_SELECTED, payload: {prevStage: stage}})
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
    let mainComponent;
    let personalDataComponent; 
    let medicalInfoComponent;

    let auth = new Authenticator()
    auth.call();

    if (this.state.stage == stages.PERSONAL_DATA) {
      mainComponent = 
        <PersonalDataForm
          onFormSubmit={this.onPersonalDataChange}
        />
    } else if (this.state.isFetching) {
      mainComponent = <ActivityIndicator animating={true} />
    } else {
      personalDataComponent = <Text> Gender: {this.state.gender} Birth Year: {this.state.birthYear} </Text>
      medicalInfoComponent = <Breadcrumbs itemObjs={this.getExistingMedicalInfo()} onItemSelection={this.onBreadcrumbSelection} />
      if (this.state.stage == stages.DIAGNOSES) {
        mainComponent = <List prompt={this.getPrompt()} items={this.getCheckboxFormOptions()} />
      }
      else {
         mainComponent = <CheckboxForm onFormSubmit={this.onSelectOptions} validateOneOption={this.checkValidateOneOption()}  prompt={this.getPrompt()} allOptions={this.getCheckboxFormOptions()} />;
      }
    }    

    return (    
      <View style={styles.container}>
        <Text style={styles.title}>Unjani</Text>
        {personalDataComponent} 
        {medicalInfoComponent}
        {mainComponent}
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
