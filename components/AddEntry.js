import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
 } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'

function SubmitBtn ({onPress}) {
  return(
    <TouchableOpacity
      onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step
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

  submit = () => {
      const key = timeToString()
      const entry = this.state
      // update redux
      this.setState({
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
      })

      // Navigate to home

      // save to DB

      // clear local notification

  }

  render() {

    const  metaInfo  = getMetricMetaInfo()
    return(
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {/* <Text>{JSON.stringify(this.state)}</Text> */}
        {/* this return an array which has 5 properties: bike, swim, ...👇 */}
        {Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return(
              //  because we are mapping we need to give it a key
              <View key={key}>
                {getIcon()}
                {/* {...rest} passing everything else thats coming from metaInfo[key] */}
                {type === 'slider'
                  ? <UdaciSlider
                      value={value}
                      onChange={(value) => this.slide(key,value)}
                      {...rest}
                    />
                  :
                    <UdaciSteppers
                      value={value}
                      onIncrement={() => this.increment(key)}
                      onDecrement={() => this.decrement(key)}
                      {...rest}
                    />
                }
              </View>
            )
          })
        }
        <SubmitBtn
          onPress={this.submit}
        />
      </View>
    )
  }
}