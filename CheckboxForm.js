import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Form, Section, SwitchCell, ButtonCell } from 'react-native-forms';
import FormErrors from './FormErrors'

export default class CheckboxForm extends React.Component {
  state = {
    errors: []
  }

  handlePress = () =>  {
    const {allOptions, onFormSubmit, validateOneOption, prompt} = this.props
    console.log(prompt)
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
  
    return (
       <Form
        ref={(ref) => { this.form = ref; }}
        onPress={this.handlePress}
      >
        <FormErrors errorsArray={this.state.errors} />
        <Section
          ref={prompt}
          title={prompt}
        >
          {allOptions.map(this.renderSwitchCell)}
          
          <ButtonCell
            title={'Submit'}
            textAlign={'center'}
            titleColor={'blue'}
          />
        </Section>
      </Form>
     )
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
