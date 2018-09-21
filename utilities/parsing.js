import { AsyncStorage } from 'react-native'

export const won = (summonerId, match) => {
  let participant
  let team
  let result
  match.participantIdentities.forEach(participantIdentity => {
    if (participantIdentity.player.accountId === summonerId) {
      participant = participantIdentity.participantId
    }
  })
  match.participants.forEach(el => {
    if (el.participantId === participant) {
      team = el.teamId
    }
  })
  match.teams.forEach(el => {
    if (el.teamId === team) {
      if (el.win === 'Fail') {
        result = false
      } else {
        result = true
      }
    }
  })
  return result
}

export const winRate = (summonerId, matches) => {
  let wins = 0
  matches.forEach(match => {
    if (won(summonerId, match)) {
      wins += 1
    }
  })

  return wins / matches.length
}
