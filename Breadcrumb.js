import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default class Breadcrumb extends React.Component {
  handleSelection() {
    const {onSelection, identifier} = this.props
    onselection(identifier)
  }

  render() {
    const {item} = this.props

    return (
      <Text onClick={this.handleSelection}> {item} </Text>
    )
  }
}
