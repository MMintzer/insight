import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import t from 'tcomb-form-native'
import axios from 'react-native-axios'
import { API_KEY } from '../secrets'

const Form = t.form.Form

const SearchSummonerForm = t.struct({
  summonerName: t.String
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class SearchSummoner extends React.Component {
  handleSubmit = async () => {
    const values = this._form.getValue()
    console.log('Summoner Name: ', values.summonerName)
    try {
      const summoner = await axios.get(
                `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${values.summonerName}?api_key=${API_KEY}`
            )
      const accountId = summoner.data.accountId
      const matches = await axios.get(
                `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?endIndex=1&api_key=${API_KEY}`
            )
      const matchId = matches.data.matches[0].gameId
      const gameInfo = await axios.get(
                `https://na1.api.riotgames.com/lol/match/v3/matches/${matchId}?api_key=${API_KEY}`
            )
      console.log('Summoner data: ', summoner.data)
      console.log('matches data: ', matches.data)
      console.log('Game Info: ', gameInfo.data)
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Welcome to Insightful!  Enter your summoner name to gain insight!</Text>
        <Form ref={c => (this._form = c)} type={SearchSummonerForm} />
        <Button title='Find Summoner' onPress={this.handleSubmit} />
      </View>
    )
  }
}
