import React from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, Image } from 'react-native'
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default class SearchSummoner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  handleSubmit = async () => {
    this.setState({
      isLoading: true
    })
    const { navigate } = this.props.navigation
    const values = this._form.getValue()
    let name = values.summonerName
    let matchesInfoArr = []
    try {
            // get accountId
      const summoner = await axios.get(
                `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${values.summonerName}?api_key=${API_KEY}`
            )

      const accountId = summoner.data.accountId
      const otherId = summoner.data.id

            // get ranking information
      const rankInfo = await axios.get(
                `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/${otherId}?api_key=${API_KEY}`
            )

            // const rankData = rankInfo.data

            // get Ids of last 10 ranked games
      const matches = await axios.get(
                `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`
            )
      const matchIds = []
      matches.data.matches.forEach(match => {
        matchIds.push(match.gameId)
      })
            // forEach does not work with async/await - Use basic for loop to get the matchInfo for each game
      for (let i = 0; i < matchIds.length; i++) {
        const matchInfo = await axios.get(
                    `https://na1.api.riotgames.com/lol/match/v3/matches/${matchIds[i]}?api_key=${API_KEY}`
                )
        matchesInfoArr.push(matchInfo.data)
      }
            // Want to cache my data at some point but for now I want to pass summonerName, accountId and matchesInforArr into summonerProfile
      rankData = rankInfo.data
      this.setState({ isLoading: false })
      navigate('Profile', { accountId, name, matchesInfoArr, rankData })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Image
          style={{ height: 150, width: 150, marginBottom: 20 }}
          source={{ uri: 'https://png.icons8.com/color/1600/league-of-legends.png' }}
                />
        <Text style={{ width: 300, marginBottom: 20, textAlign: 'center' }}>
                    Welcome to Insightful!
                </Text>
        <Text style={{ width: 300, marginBottom: 20, textAlign: 'center' }}>
                    Enter a summoner name to gain insight!
                </Text>
        <Form style={{ width: 300 }} ref={c => (this._form = c)} type={SearchSummonerForm} />
        <Button title='Find Summoner' onPress={this.handleSubmit} />
      </View>
    )
  }
}
