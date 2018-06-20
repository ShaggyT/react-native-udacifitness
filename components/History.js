import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
 } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
 import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'


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
  //  the object : either {run: , bike: , } or {today: } - its the day coming from the redux store
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
     <View style={styles.item}>
       {today
         //  get the daily reminder value
         // ? <Text>{JSON.stringify(today)}</Text>
         // : <Text>{JSON.stringify(metrics)}</Text>}
         ? <View>
             <DateHeader date={formattedDate}/>
             <Text style={styles.noDataText}>
               {today}
             </Text>
           </View>
          : <TouchableOpacity
              onPress={() => console.log('Pressed!')}
            >
              <Text>{JSON.stringify(metrics)}</Text>
            </TouchableOpacity>}
     </View>
   )
   renderEmptyDate(formattedDate) {
     return (
       <View style={styles.item}>
         <DateHeader />
         <Text style={styles.noDataText}>
           You didn't log any data on this day.
         </Text>
       </View>
     )
   }

  render() {
    const { entries } = this.props
    return (
      <UdaciFitnessCalendar
       items={entries}
       renderItem={this.renderItem}
       renderEmptyDate={this.renderEmptyDate}
     />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

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
