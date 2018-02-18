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
        <Text style={styles.breadcrumb}>{this.props.item}</Text>  
      </TouchableOpacity>
    )
  }
}

const styles = {
  breadcrumb: {
    fontFamily: 'open-sans-bold',
    color: '#000000',
    fontSize: 14
  }
}
