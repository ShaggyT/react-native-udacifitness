import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'
import DateHeader from './DateHeader'
import { getMetricMetaInfo } from '../utils/helpers'

export default function MetricCard ({metrics,date}) {
  return(
    <View>
      {date && <DateHeader date={date} />}
      {/* an array with all the items in metrics being the key */}
      {Object.keys(metrics).map((metric) => {
        const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)
        return (
          <View style={styles.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{fontSize: 20}}>
                {displayName}
              </Text>
              <Text style={{fontSize: 16, color: gray}}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  },
})
