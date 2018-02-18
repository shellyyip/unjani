import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import styles from './FormStyles'
import t from 'tcomb-form-native';

const Form = t.form.Form;

export default class CheckboxForm extends React.Component {
  handlePress = () =>  {
    const {allOptions, onFormSubmit, validateOneOption, prompt} = this.props
    let allIndexes = this.form.getData()[prompt];
    console.log(Object.keys(this.form.getData()))
    console.log(Object.values(this.form.getData()))
    let allIndexKeys = Object.keys(allIndexes);
    let selectedIndexes = allIndexKeys.filter(key => allIndexes[key] == true);
    let selected = allOptions.filter((obj, index) => 
      selectedIndexes.includes(index.toString())
    );
    let selectedIDs = selected.map((obj) => obj.ID );
    console.log("in handle press. selected IDs: " + selectedIDs);
    (validateOneOption && selectedIDs.length > 1) ? this.setState({errors: ["Please select only one location"]})  : onFormSubmit(selectedIDs);
  }
 
  renderSwitchCell = (symptomObj, i) => {
    return (
      <SwitchCell title={symptomObj.Name}  key={i} ref={i}>  </SwitchCell>
    )
  }

  render () {
    const {allOptions, prompt} = this.props
    let symptomsByID = {}
    let customizeOptions = {fields: {}}  
    
    allOptions.forEach(obj =>{ 
      symptomsByID[obj.ID] = t.Boolean
      customizeOptions['fields'][obj.ID] = {label: obj.Name}
    })  

    let symptomsForForm = t.struct(symptomsByID)  

    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Form type={symptomsForForm} options={customizeOptions}  ref={c => this._form = c} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onFormSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
