import React from 'react'
import { Form, Section, ButtonCell, ActionSheetCell, TextInputCell } from 'react-native-forms';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PersonalDataForm extends React.Component {
  renderBirthYearInput = () => {
    return (
      <TextInputCell
        ref="BirthYearInput"
        inputProps={{ value: '1989', title: 'Birth Year' }}
      />
    )
  }

  renderGenderInput = () => {
    const alertIcon = <Icon name={'ios-alert'} color={'gray'} size={20} />;
    return (
      <ActionSheetCell
        ref={'GenderInput'}
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
      >
        <Section
          ref={'personalDataSection'}
        >
          {this.renderBirthYearInput()}
          {this.renderGenderInput()}
          
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
