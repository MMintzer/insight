import React from 'react'
import { BarChart, Grid, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

export default class KillsChart extends React.Component {
  render () {
    const data = this.props.data
    const fill = 'rgb(37, 105, 154)'
    return (
      <View>
        <BarChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{ fill }}
          spacingInner={0.05}
          spacingOuter={0.05}
                >
          <Grid />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: 0 }}
          data={data}
          formatLabel={(value, index) => index + 1}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
                />
      </View>
    )
  }
}
