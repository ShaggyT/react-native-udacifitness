import AsyncStorage from 'react-native'

//  CALENDAR_STORAGE_KEY: Where we persist data inside AsyncStorage
export function submitEntry (entry,key ) {
  return
    AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY,JSON.stringify({
      [key]: entry
    }))
}

export function removeEntry (key) {
  return
  AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    delete data[key]
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  })
}
