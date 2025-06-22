import { View, Text } from 'react-native'
import React from 'react'
import RootLayout from './RootLayout'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './context/AuthContent'

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootLayout />
      </SafeAreaProvider>
    </AuthProvider>
  )
}

export default App