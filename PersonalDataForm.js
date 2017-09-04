import React from 'react'
import { Form, Section, ButtonCell, ActionSheetCell, TextInputCell } from 'react-native-forms';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PersonalDataForm extends React.Component {
  onFormSubmit = (ref) => {
    if (ref === 'submitButton') {
      let section = this.form.getData().personalDataSection
      let gender = section.genderInput
      let birthYear = section.birthYearInput
      const {onFormSubmit} = this.props
      onFormSubmit(gender, birthYear) 
    }
   }

  renderBirthYearInput = () => {
    return (
      <TextInputCell
        ref="birthYearInput"
        inputProps={{ placeholder: 'Birth Year' }}
      />
    )
  }

  renderGenderInput = () => {
    const alertIcon = <Icon name={'ios-alert'} color={'gray'} size={20} />;
    return (
      <ActionSheetCell
        ref={'genderInput'}
        title={'Gender'}
        options={['male', 'female']}
        icon={alertIcon}
        selectedValueIndex={0}
      />
    )
  }

  render () {
    return (
      <Form
        ref={(ref) => { this.form = ref; }}
        onPress={this.onFormSubmit.bind(this)}
      >
        <Section
          ref={'personalDataSection'}
        >
          {this.renderBirthYearInput()}
          {this.renderGenderInput()}
          
          <ButtonCell
            ref={'submitButton'}
            title={'Submit'}
            textAlign={'center'}
            titleColor={'blue'}
          />
        </Section>
      </Form>
     )
  }
}
