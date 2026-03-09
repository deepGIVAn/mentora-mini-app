import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { ApiService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Student } from '../../types';
import { Theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LogOut, Plus, User as UserIcon } from 'lucide-react-native';
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
      <View style={styles.avatarWrapper}>
        <View style={styles.iconBackground}>
          <UserIcon size={24} color={Theme.colors.border} />
        </View>
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
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('StudentProfile', { studentId: item.id })}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
        <Button 
          title="Lessons" 
          variant="outline" 
          onPress={() => navigation.navigate('LessonList', { studentId: item.id })}
          style={styles.viewButton}
        />
      </View>
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
  avatarWrapper: {
    position: 'relative',
    width: 48,
    height: 48,
    marginRight: Theme.spacing.md,
  },
  iconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Theme.colors.background,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  profileButtonText: {
    color: Theme.colors.primary,
    fontSize: 14,
    fontWeight: '600' as any,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
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
