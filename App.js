import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CheckboxForm from './CheckboxForm'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Unjani</Text>
        <CheckboxForm/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
