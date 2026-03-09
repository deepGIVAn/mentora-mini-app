import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ParentDashboard } from '../screens/parent/ParentDashboard';
import { CreateStudentScreen } from '../screens/parent/CreateStudentScreen';
import { LessonListScreen } from '../screens/common/LessonListScreen';
import { SessionListScreen } from '../screens/common/SessionListScreen';
import { SessionDetailScreen } from '../screens/common/SessionDetailScreen';
import { StudentProfileScreen } from '../screens/parent/StudentProfileScreen';

const Stack = createStackNavigator();

export const ParentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={ParentDashboard} />
      <Stack.Screen name="CreateStudent" component={CreateStudentScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="LessonList" component={LessonListScreen} />
      <Stack.Screen name="SessionList" component={SessionListScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    </Stack.Navigator>
  );
};
