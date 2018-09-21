import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchSummoner from './components/SearchSummoner'
import SummonerProfile from './components/SummonerProfile'
import { createStackNavigator } from 'react-navigation'

const App = createStackNavigator({
  Home: { screen: SearchSummoner },
  Profile: { screen: SummonerProfile }
})

export default App

// export default class App extends React.Component {
//   render () {
//     return (
//       <View style={styles.container}>
//         <SearchSummoner />
//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
