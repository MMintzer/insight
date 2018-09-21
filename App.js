import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchSummoner from './components/SearchSummoner'

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <SearchSummoner />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
