import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import { createBottomTabNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

//  custome statusbar
function UdaciStatusBar({backgroundColor, ...props}) {
    return(
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

//  this returns us a component
const Tabs = createBottomTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  //  get rid of any headers that we will eventually have in our app 
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          {/* <View style={{height: 20}} />
           */}
           <UdaciStatusBar backgroundColor={purple}
           barStyle="light-content"
           />
          {/* <AddEntry /> */}
          {/* <History /> */}
          <Tabs />
        </View>
    </Provider>
    );
  }
}
