import SearchSummoner from './components/SearchSummoner'
import SummonerProfile from './components/SummonerProfile'
import { createStackNavigator } from 'react-navigation'

const App = createStackNavigator({
  Home: { screen: SearchSummoner },
  Profile: { screen: SummonerProfile }
})

export default App
