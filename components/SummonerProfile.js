import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { winRate, killsCounterData } from '../utilities/parsing'
import WinRatePie from './WinRatePie'
import KillsChart from './KillsChart'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class SummonerProfile extends React.Component {
  render () {
    const accountId = this.props.navigation.state.params.accountId
    const matchesInfoArr = this.props.navigation.state.params.matchesInfoArr
    const winData = winRate(accountId, matchesInfoArr)
    const killData = killsCounterData(accountId, matchesInfoArr)
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', marginTop: 75 }}>
          <View style={{ alignSelf: 'center', textAlign: 'center' }}>
            <Text>
                            Profile for: {this.props.navigation.state.params.name}
                            's last 10 games
                        </Text>
            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                            Wins for last 10 games{' '}
            </Text>
            <WinRatePie data={winData} />
          </View>
          <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                        Kills for last 10 games{' '}
          </Text>
          <View style={{ width: 250, alignSelf: 'center' }}>
            <KillsChart data={killData} />
          </View>
        </View>
      </ScrollView>
    )
  }
}
