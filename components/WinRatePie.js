import React from 'react'
import * as d3 from 'd3'
import { ART, View, Text } from 'react-native'

const { Surface, Group, Shape } = ART

const colorDecider = index => {
  return index === 0 ? '192, 24, 49' : '72, 144, 48'
}

export default class WinRatePie extends React.Component {
  render () {
    data = this.props.data
    const width = 250
    const height = 250
    const sectionAngles = d3.pie().value(d => d.winRate)(data)
    const path = d3.arc().outerRadius(100).padAngle(0.05).innerRadius(60)
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>
          {data[0].winRate * 10} Wins / {data[1].winRate * 10} Losses
                </Text>
        <Surface width={width} height={height}>
          <Group x={width / 2} y={height / 2}>
            {sectionAngles.map(section => (
              <Shape
                key={section.index}
                d={path(section)}
                stroke='#000'
                fill={`rgb(${colorDecider(section.index)})`}
                strokeWidth={1}
                            />
                        ))}
          </Group>
        </Surface>
      </View>
    )
  }
}
