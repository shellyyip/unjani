import React from 'react'
import { View, Text } from 'react-native'
import { Form, Section, SwitchCell, ButtonCell } from 'react-native-forms';

export default class CheckboxForm extends React.Component {
  handlePress ()  {
    const {allOptions} = this.props
    let allSymptomIndexes = this.form.getData().symptomsSection;
    let allSymptomIndexKeys = Object.keys(allSymptomIndexes);
    let selectedIndexes = allSymptomIndexKeys.filter(key => allSymptomIndexes[key] == true);
    let selected = allOptions.filter((obj, index) => 
      selectedIndexes.includes(index.toString())
    );
    let selectedIDs = selected.map((obj) => obj.ID );
    console.log(selectedIDs);
  }
  
  renderSwitchCell = (symptomObj, i) => {
    return (
      <SwitchCell title={symptomObj.Name}  key={i} ref={i}>  </SwitchCell>
    )
  }

  render () {
    const {allOptions} = this.props
  
    return (
      <Form
        ref={(ref) => { this.form = ref; }}
        onPress={this.handlePress.bind(this)}
      >
        <Section
          ref={'symptomsSection'}
          title={'SYMPTOMS'}
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
