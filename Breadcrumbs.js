import React from 'react'
import { FlatList, Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Breadcrumb from './Breadcrumb'

export default class Breadcrumbs extends React.Component {
  renderItem = (itemObj, index) => {
    const {onItemSelection} = this.props
    let icon; 
    if (index > 0) {
      icon = <Icon name="ios-arrow-forward" ios="ios-arrow-forward" md="md-arrow-forward" />;
    }
    return (
      <View key={index}>
        {icon}
        <Breadcrumb onSelection={onItemSelection} item={itemObj.item} identifier={itemObj.identifier} /> 
      </View>
    )
  }

  render() {
    const {itemObjs} = this.props
 
    return (
      <View>
        {itemObjs.map(this.renderItem)}
      </View>
    )
  }
}
