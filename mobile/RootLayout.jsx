import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafeScreen from './components/SafeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MainStack from './screens/MainStack';
import { useAuth } from './context/AuthContent';

const Stack = createNativeStackNavigator();

const RootLayout = () => {
  const {state} = useAuth();
  return (
    <SafeScreen>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state?.token ? (
            <Stack.Screen name="Main" component={MainStack} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeScreen>
  );
};

export default RootLayout;
