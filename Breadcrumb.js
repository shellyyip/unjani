import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Breadcrumb extends React.Component {
  handleSelection = () => {
    const {onSelection, identifier} = this.props
    onSelection(identifier)
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleSelection}>
        <Text>{this.props.item}</Text>  
      </TouchableOpacity>
    )
  }
}
