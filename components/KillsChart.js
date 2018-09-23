import React from 'react'
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View } from 'react-native'

export default class KillsChart extends React.Component {
  render () {
    const data = this.props.data
    return (
      <View>
        <BarChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          svg={{ fill: 'rgba(134,65,244,0.8)' }}
          spacingInner={0.05}
          spacingOuter={0.05}
                >
          <Grid />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={data}
          formatLabel={(value, index) => index + 1}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
                />
        {/*       <YAxis
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'grey', fontSize: 10 }}
          numberOfTicks={data.sort()[data.length - 1]}
          formatLabel={value => `${value} kills`}
 /> */}
      </View>
    )
  }
}
