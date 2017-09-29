import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Form, Section, SwitchCell, ButtonCell } from 'react-native-forms';
import FormErrors from './FormErrors'

export default class CheckboxForm extends React.Component {
  state = {
    errors: []
  }

  handlePress = () =>  {
    const {allOptions, onFormSubmit, validateOneOption} = this.props
    let sectionRef = Object.keys(this.form.getData())[0]
    let allIndexes = this.form.getData()[sectionRef];
    let allIndexKeys = Object.keys(allIndexes);
    let selectedIndexes = allIndexKeys.filter(key => allIndexes[key] == true);
    let selected = allOptions.filter((obj, index) => 
      selectedIndexes.includes(index.toString())
    );
    let selectedIDs = selected.map((obj) => obj.ID );
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
