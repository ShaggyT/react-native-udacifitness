import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'

class History extends Component {
  //  when this component is mount we want to fetch our calendar results
  componentDidMount () {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
       //  get all of our entries and add it to our current state
      .then(({ entries }) => {
        //  no information for current day
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })

  }
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    )
  }
}

//  we dont have any local state, the calendar state lives inside the redux
function mapStateToProps (entries) {
  return {
    // we receive the state which is entries
    entries
  }
}

// connect our component to get access to dispatch
export default connect(
  mapStateToProps,
)(History)
