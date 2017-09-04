import React from 'react'
import { StyleSheet, Text } from 'react-native';

export default class FormErrors extends React.Component {
  render() {
    const errorText = this.props.errorsArray.join(" ")
    return (
      <Text style={styles.errors}>
        {errorText}
      </Text>
    )
  }
}


const styles = StyleSheet.create({
  errors: {
    color: '#FF0000'
  }
})
