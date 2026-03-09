import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MentorDashboard } from '../screens/mentor/MentorDashboard';
import { LessonListScreen } from '../screens/common/LessonListScreen';
import { SessionListScreen } from '../screens/common/SessionListScreen';
import { SessionDetailScreen } from '../screens/common/SessionDetailScreen';

const Stack = createStackNavigator();

export const MentorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={MentorDashboard} />
      <Stack.Screen name="LessonList" component={LessonListScreen} />
      <Stack.Screen name="SessionList" component={SessionListScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    </Stack.Navigator>
  );
};
