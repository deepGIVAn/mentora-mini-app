import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ApiService } from '../../services/api';
import { Lesson } from '../../types';
import { Theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { ChevronRight, BookOpen } from 'lucide-react-native';

export const LessonListScreen = ({ route, navigation }: any) => {
  const { studentId } = route.params || {};
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.getLessons();
        setLessons(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const renderLessonCard = ({ item }: { item: Lesson }) => (
    <TouchableOpacity onPress={() => navigation.navigate('SessionList', { lessonId: item.id, lessonTitle: item.title })}>
      <Card style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <BookOpen size={24} color={item.color || Theme.colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <ChevronRight size={20} color={Theme.colors.border} />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Lessons</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Theme.colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={lessons}
          renderItem={renderLessonCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
  backButton: {
    padding: Theme.spacing.xs,
  },
  backButtonText: {
    color: Theme.colors.primary,
    fontWeight: '600' as any,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: Theme.colors.text,
  },
  loader: {
    marginTop: Theme.spacing.xl,
  },
  listContent: {
    padding: Theme.spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as any,
    color: Theme.colors.text,
  },
  description: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
});
