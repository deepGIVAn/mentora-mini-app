import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ApiService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isValidDateFormat } from '../../utils/dateUtils';

export const CreateStudentScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name || !email || !password || !dob) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidDateFormat(dob)) {
      Alert.alert('Invalid Date', 'Please enter DOB in YYYY-MM-DD format (e.g., 2015-05-20)');
      return;
    }

    setIsSubmitting(true);
    try {
      await ApiService.createStudent({
        name,
        email,
        dob,
        parentId: user?.id,
      });
      Alert.alert('Success', 'Student created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Student</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Enter student details to create their account.</Text>

        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Alice Doe"
        />

        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. alice@example.com"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 6 characters"
          secureTextEntry
        />

        <Input
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
        />

        <Button
          title="Create Account"
          onPress={handleCreate}
          isLoading={isSubmitting}
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    paddingTop: 60,
  },
  backButton: {
    padding: Theme.spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: Theme.colors.text,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },
  submitButton: {
    marginTop: Theme.spacing.lg,
  },
});
