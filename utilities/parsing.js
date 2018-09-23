import * as d3 from 'd3'

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

  return [
    {
      winRate: 1 - wins / matches.length
    },
    {
      winRate: wins / matches.length
    }
  ]
}

export const killsCounter = (summonerId, match) => {
  let participant
  let kills

  match.participantIdentities.forEach(el => {
    if (el.player.accountId === summonerId) {
      participant = el.participantId
    }
  })

  match.participants.forEach(el => {
    if (el.participantId === participant) {
      kills = el.stats.kills
    }
  })

  return kills
}

export const killsCounterData = (summonerId, matches) => {
  const result = []
  matches.forEach(match => {
    result.push(killsCounter(summonerId, match))
  })

  return result
}

export const createScaleY = (min, max, height) => {
  return d3.scaleLinear().domain([min, max]).nice().range([height, 0])
}

export const extent = arr => {}
