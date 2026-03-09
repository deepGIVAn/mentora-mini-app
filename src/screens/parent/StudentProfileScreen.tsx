import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { ApiService } from '../../services/api';
import { Theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ChevronLeft, User as UserIcon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isValidDateFormat, calculateAge } from '../../utils/dateUtils';
import { Student } from '../../types';

export const StudentProfileScreen = ({ route, navigation }: any) => {
  const { studentId } = route.params;
  const [student, setStudent] = useState<Student | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.getStudentById(studentId);
      setStudent(data);
      setName(data.name);
      setEmail(data.email);
      setDob(data.dob);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch student details');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name || !email || !dob) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    if (!isValidDateFormat(dob)) {
      Alert.alert('Invalid Date', 'Please enter DOB in YYYY-MM-DD format');
      return;
    }

    setIsUpdating(true);
    try {
      const updateData: any = { name, email, dob };
      if (password) updateData.password = password;

      await ApiService.updateStudent(studentId, updateData);
      Alert.alert('Success', 'Profile updated successfully!');
      fetchStudent(); // Refresh data
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.iconBackground}>
              <UserIcon size={40} color={Theme.colors.border} />
            </View>
            {student?.avatar ? (
              <Image source={{ uri: student.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitials}>{student?.name?.charAt(0)}</Text>
              </View>
            )}
          </View>
          <Text style={styles.studentNameHeader}>{student?.name}</Text>
          <Text style={styles.ageText}>{calculateAge(student?.dob || '')} years old</Text>
        </View>

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
          label="New Password (optional)"
          value={password}
          onChangeText={setPassword}
          placeholder="Leave blank to keep current"
          secureTextEntry
        />

        <Input
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
        />

        <Button
          title="Update Profile"
          onPress={handleUpdate}
          isLoading={isUpdating}
          style={styles.updateButton}
        />
        
        <Text style={styles.infoText}>
          Updating email or password will change the student's login credentials.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  avatarWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: Theme.spacing.md,
  },
  iconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F3F4F6',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '700' as any,
    color: Theme.colors.primary,
  },
  studentNameHeader: {
    fontSize: 22,
    fontWeight: '700' as any,
    color: Theme.colors.text,
  },
  ageText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  updateButton: {
    marginTop: Theme.spacing.lg,
  },
  infoText: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: Theme.spacing.lg,
    lineHeight: 18,
  },
});
