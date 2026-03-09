import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { ApiService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Student } from '../../types';
import { Theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LogOut, Plus } from 'lucide-react-native';
import { calculateAge } from '../../utils/dateUtils';

export const ParentDashboard = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await ApiService.getStudentsByParent(user.id);
      setStudents(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchStudents();
    });
    return unsubscribe;
  }, [navigation]);

  const renderStudentCard = ({ item }: { item: Student }) => (
    <Card style={styles.studentCard}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{item.name.charAt(0)}</Text>
          </View>
        )}
      </View>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentDetails}>Age: {calculateAge(item.dob)}</Text>
      </View>
      <Button 
        title="View Lessons" 
        variant="outline" 
        onPress={() => navigation.navigate('LessonList', { studentId: item.id })}
        style={styles.viewButton}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, {user?.name}</Text>
          <Text style={styles.roleText}>Parent Account</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <LogOut size={20} color={Theme.colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Students</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateStudent')}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Theme.colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={students}
          renderItem={renderStudentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No students added yet.</Text>
            </View>
          }
        />
      )}
    </View>
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
  welcomeText: {
    fontSize: 20,
    fontWeight: '700' as any,
    color: Theme.colors.text,
  },
  roleText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  logoutButton: {
    padding: Theme.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: Theme.colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600' as any,
    marginLeft: Theme.spacing.xs,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  avatarContainer: {
    marginRight: Theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: '700' as any,
    color: Theme.colors.primary,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600' as any,
    color: Theme.colors.text,
  },
  studentDetails: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  loader: {
    marginTop: Theme.spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
  },
  emptyText: {
    color: Theme.colors.textSecondary,
    fontSize: 14,
  },
});
