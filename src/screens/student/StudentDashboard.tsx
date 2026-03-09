import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LogOut, BookOpen, GraduationCap, Award, User as UserIcon } from 'lucide-react-native';

export const StudentDashboard = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarWrapper}>
            <View style={styles.iconBackground}>
              <UserIcon size={20} color={Theme.colors.border} />
            </View>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.headerAvatar} />
            ) : (
              <View style={[styles.headerAvatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitials}>{user?.name?.charAt(0)}</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
            <Text style={styles.roleText}>Student Account</Text>
          </View>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <LogOut size={20} color={Theme.colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <BookOpen size={20} color={Theme.colors.primary} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </Card>
          <Card style={styles.statCard}>
            <Award size={20} color={Theme.colors.secondary} />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
          <Card style={styles.statCard}>
            <GraduationCap size={20} color={Theme.colors.warning} />
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Grade</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <Button 
          title="Browse All Lessons" 
          onPress={() => navigation.navigate('LessonList')} 
          style={styles.browseButton}
        />

        <Card style={{ ...styles.nextCard, borderLeftColor: Theme.colors.primary, borderLeftWidth: 4 }}>
          <Text style={styles.nextTitle}>Next Live Session</Text>
          <Text style={styles.nextLesson}>Advanced Algebra</Text>
          <Text style={styles.nextDate}>Tomorrow at 10:00 AM</Text>
          <Button 
            title="Join Now" 
            variant="outline" 
            onPress={() => {}} 
            style={styles.joinButton}
          />
        </Card>
      </ScrollView>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    marginRight: Theme.spacing.sm,
  },
  iconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Theme.colors.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
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
  avatarPlaceholder: {
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: '700' as any,
    color: Theme.colors.primary,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  statCard: {
    width: '31%',
    alignItems: 'center',
    padding: Theme.spacing.sm,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700' as any,
    color: Theme.colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: Theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  browseButton: {
    marginBottom: Theme.spacing.xl,
  },
  nextCard: {
    padding: Theme.spacing.lg,
  },
  nextTitle: {
    fontSize: 12,
    color: Theme.colors.primary,
    fontWeight: '700' as any,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  nextLesson: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: Theme.colors.text,
  },
  nextDate: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  joinButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    minHeight: 36,
  },
});
