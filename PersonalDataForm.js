import React from 'react'
import { Form, Section, ButtonCell, ActionSheetCell, TextInputCell, createValidator } from 'react-native-forms';
import Icon from 'react-native-vector-icons/Ionicons';
import { birthYearValidator } from './validators';
import FormErrors from './FormErrors'
import { View } from 'react-native';

export default class PersonalDataForm extends React.Component {
  state = {
    errors: []
  }

  onFormSubmit = (ref) => {
    let errorsArray = Object.values(this.form.getValidationErrors().personalDataSection) 
    if (errorsArray.length == 0) {
      if (ref === 'submitButton') {
        let section = this.form.getData().personalDataSection
        let gender = section.genderInput
        let birthYear = section.birthYearInput
        const {onFormSubmit} = this.props
        onFormSubmit(gender, birthYear) 
      }
    } else {
      this.setState({errors: errorsArray})
    }
  }

  renderBirthYearInput = () => {
    return (
      <TextInputCell
        ref="birthYearInput"
        inputProps={{ placeholder: 'Birth Year' }}
        validator={createValidator(birthYearValidator, { errorMessage: 'Invalid Birth Year' })}
      />
    )
  }

  renderGenderInput = () => {
    const alertIcon = <Icon name="ios-alert" ios="ios-alert" md="md-alert" color={'gray'} size={20} />;
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
          <FormErrors errorsArray={this.state.errors} />
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
