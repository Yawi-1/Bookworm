import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import SafeScreen from '../../components/SafeScreen'
const AuthLayout = () => {
  return (
    <SafeScreen>
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='/(auth)'/>
        <Stack.Screen name='/(auth)/Signup'/>
    </Stack>
    </SafeScreen>
  )
}

export default AuthLayout