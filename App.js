import React from 'react';

import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

import { store, actionTypes, stages, stagesKeys, prompts } from './unjaniRedux'

import Requester from './Requester'
import Authenticator from './Authenticator'
import PersonalDataForm from './PersonalDataForm'
import CheckboxForm from './CheckboxForm'
import List from './List'
import Breadcrumbs from './Breadcrumbs'

import { Font } from 'expo';

export default class App extends React.Component {
  state = {fontsAreLoaded: false}  

  async componentWillMount() {
    //handle promise rejection
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({...store.getState(), fontsAreLoaded: true});
  
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
    // make this the same requester throughout the code. no need to reinstantiate
    let requester = new Requester(this.state.gender, this.state.birthYear, this.state.authToken) 
    requester.get()
  }

  render() {
    let mainComponent = <ActivityIndicator animating={true} />;
    let personalDataComponent; 
    let medicalInfoComponent;
    let navComponent;
    let containerComponent;

    if (!this.state.authToken) {
      let auth = new Authenticator()
      auth.call();
    }

    if (this.state.fontsAreLoaded) {
      navComponent = <Text style={styles.title}> UNJANI </Text>
      if (!this.state.isFetching) {
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
      }
      containerComponent = (
        <View style={styles.container}>
         {navComponent}
         <Image style={styles.image} source={require('./img/doctor.jpg')} />
          {personalDataComponent}
         {medicalInfoComponent}
         {mainComponent}
        </View>
      )
    } else {
      containerComponent = <ActivityIndicator animating={true} />; 
    }   

    return (
      <View  style={styles.container}>    
        {containerComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: 400
  },
  title: {
    backgroundColor: '#1e90ff',
    fontWeight: 'bold',
    color: 'white',
    padding: 15,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
