import React from 'react'
import { FlatList, Text, StyleSheet, View } from 'react-native'

export default class List extends React.Component {
  state = { formattedItems: [] }  

  componentWillMount() {  
    const {items} = this.props
    const formattedItems = items.map((o)=>{ return (o.Issue) })
    this.setState({formattedItems: formattedItems})
  }

  extractKey = ({ID}) => ID

  renderItem = ({item}) => {
    return (
      <Text style={styles.row}>
        {item.Name}: {item.Accuracy}% Chance
      </Text>
    )
  }

  render() {
    return (
      <View>
        <Text> {this.props.prompt} </Text>
        <FlatList
          style={styles.container}
          data={this.state.formattedItems}
          renderItem={this.renderItem}
          keyExtractor={this.extractKey}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: 'peru',
  },
})
