import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

const TargetScreen = () => {
  return (
    
      <WebView source={{uri: 'https://www.google.com'}} style={{flex: 1}}/>
    
  )
}

export default TargetScreen

const styles = StyleSheet.create({})