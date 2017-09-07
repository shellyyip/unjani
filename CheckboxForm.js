import React from 'react'
import { View, Text } from 'react-native'
import { Form, Section, SwitchCell, ButtonCell } from 'react-native-forms';

export default class CheckboxForm extends React.Component {
  handlePress ()  {
    const {allOptions, onFormSubmit} = this.props
    let allIndexes = this.form.getData().optionsSection;
    let allIndexKeys = Object.keys(allIndexes);
    let selectedIndexes = allIndexKeys.filter(key => allIndexes[key] == true);
    let selected = allOptions.filter((obj, index) => 
      selectedIndexes.includes(index.toString())
    );
    let selectedIDs = selected.map((obj) => obj.ID );
    onFormSubmit(selectedIDs);
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
        onPress={this.handlePress.bind(this)}
      >
        <Section
          ref={'optionsSection'}
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
