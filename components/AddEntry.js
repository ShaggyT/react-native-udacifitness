import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
 } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { addEntry } from '../actions'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'

function SubmitBtn ({onPress}) {
  return(
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
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
      //  saving specific entry into redux store
      this.props.dispatch(addEntry({
        [key]: entry
      }))
      this.setState({
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
      })

      // Navigate to home

      // save to DB
      submitEntry({ key, entry })
      // clear local notification

  }

  reset = () => {
    const key = timeToString()

    //  update redux
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
    // navigate to home

    //  update DB
    removeEntry(key)

  }

  render() {

    const  metaInfo  = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return(
          <View style={styles.center}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy' }
              size={100}
            />
              <Text>You already Logged in your information for today!</Text>
              <TextButton style={{padding: 10}} onPress={this.reset}>
                Reset
              </TextButton>
          </View>
      )
    }

    return(
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {/* <Text>{JSON.stringify(this.state)}</Text> */}
        {/* this return an array which has 5 properties: bike, swim, ...👇 */}
        {Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return(
              //  because we are mapping we need to give it a key
              <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

//  we have 3 different values inside the redux store
// {
// 'bike':
// ....
// }
// key : value= null (no data logged)
// key(today): value (" ")

function mapStateToProps (state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}


export default connect(mapStateToProps)(AddEntry)
