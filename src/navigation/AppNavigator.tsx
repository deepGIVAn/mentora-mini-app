import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { View, ActivityIndicator } from 'react-native';
import { ParentNavigator } from './ParentNavigator';
import { StudentNavigator } from './StudentNavigator';
import { MentorNavigator } from './MentorNavigator';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            {user.role === 'parent' && (
              <Stack.Screen name="ParentHome" component={ParentNavigator} />
            )}
            {user.role === 'student' && (
              <Stack.Screen name="StudentHome" component={StudentNavigator} />
            )}
            {user.role === 'mentor' && (
              <Stack.Screen name="MentorHome" component={MentorNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
