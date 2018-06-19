import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'

export default function entries (state = {}, action) {
  //  state object - key is the specific day and the value is the metric for that day
  switch(action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default:
      return state
  }
}
