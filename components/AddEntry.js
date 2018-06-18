import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eati: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState(() => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState(() => {
      const count = state[metric] + getMetricMetaInfo(metric).step
      return {
        //  not necessary to put copy of state in the return value as setState merges the state updates with the old state
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric,value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  render() {
    return(
      <View>
        {/* <Text>Add Entry</Text> */}
        {getMetricMetaInfo('swim').getIcon()}
      </View>
    )
  }
}
