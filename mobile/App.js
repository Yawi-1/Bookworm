import { View, Text } from 'react-native'
import React from 'react'
import RootLayout from './RootLayout'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './context/AuthContent'
import { BookProvider } from './context/BookContext'

const App = () => {
  return (
    <AuthProvider>
      <BookProvider>
        <SafeAreaProvider>
          <RootLayout />
        </SafeAreaProvider>
      </BookProvider>
    </AuthProvider>
  )
}

export default App