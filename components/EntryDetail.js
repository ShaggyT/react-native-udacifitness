import React, { Component } from 'react'
import { View, Text, StyleSheet }  from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import MetricCard from './MetricCard'
import { white } from '../utils/colors'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import TextButton from './TextButton'

class EntryDetail extends Component {
  //  adding static property to dynamically set navigation options
  static navigationOptions = ({ navigation }) => {
    //  comes from History.js when we navigate to 'EntryDetail' we are passing the entryId
    const { entryId } = navigation.state.params

    const year = entryId.slice(0, 4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }

  reset = () => {
    const { remove, goBack, entryId } = this.props

    remove()
    goBack()
    removeEntry(entryId)
   }

  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { metrics } = this.props
    return(
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        {/* <Text>Entry Detail - {JSON.stringify(this.props.navigation.state.params.entryId)}</Text> */}
        <TextButton style={{margin: 20}} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps (state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId]
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}



//  connect EntryDetail to redux to go and grab day for specific key
export default connect(mapStateToProps, mapDispatchToProps,)(EntryDetail)
