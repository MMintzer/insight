import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getSummonerData } from '../utilities/parsing'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class SummonerProfile extends React.Component {
  render () {
    console.log(this.props.navigation.state.params)
    return (
      <View style={styles.container}>
        <Text>Profile for: {this.props.navigation.state.params.name}</Text>
      </View>
    )
  }
}
