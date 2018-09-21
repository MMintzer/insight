import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import t from 'tcomb-form-native'
import axios from 'react-native-axios'
import { API_KEY } from '../secrets'
import { won, winRate } from '../utilities/parsing'

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
    let matchesInfoArr = []
    try {
            // get accountId
      const summoner = await axios.get(
                `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${values.summonerName}?api_key=${API_KEY}`
            )

      const accountId = summoner.data.accountId

            // get Ids of last 10 ranked games
      const matches = await axios.get(
                `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`
            )
      const matchIds = []
      matches.data.matches.forEach(match => {
        matchIds.push(match.gameId)
      })
      console.log('matches --->', matchIds)

            // forEach does not work with async/await
      for (let i = 0; i < matchIds.length; i++) {
        const matchInfo = await axios.get(
                    `https://na1.api.riotgames.com/lol/match/v3/matches/${matchIds[i]}?api_key=${API_KEY}`
                )
        matchesInfoArr.push(matchInfo.data)
      }

      console.log('Winrate = >', winRate(accountId, matchesInfoArr))
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
