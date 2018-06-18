import  React  from 'react'
import {
  Text,
  TouchableOpacity ,
} from 'react-native'

export default function TextButton ({onPress, children}) {
  return(
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}
