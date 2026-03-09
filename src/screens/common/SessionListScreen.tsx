import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ApiService } from '../../services/api';
import { Session } from '../../types';
import { Theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { ChevronLeft, Calendar } from 'lucide-react-native';

export const SessionListScreen = ({ route, navigation }: any) => {
  const { lessonId, lessonTitle } = route.params;
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.getSessionsByLesson(lessonId);
        setSessions(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, [lessonId]);

  const renderSessionCard = ({ item }: { item: Session }) => (
    <TouchableOpacity onPress={() => navigation.navigate('SessionDetail', { sessionId: item.id })}>
      <Card style={styles.card}>
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionTopic}>{item.topic}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>New</Text>
          </View>
        </View>
        <View style={styles.sessionMeta}>
          <Calendar size={14} color={Theme.colors.textSecondary} />
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lessonTitle} Sessions</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Theme.colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSessionCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No sessions found for this lesson.</Text>
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
  backButton: {
    padding: Theme.spacing.xs,
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
    padding: Theme.spacing.md,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  sessionTopic: {
    fontSize: 16,
    fontWeight: '600' as any,
    color: Theme.colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: Theme.colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: Theme.colors.primary,
    fontWeight: '700' as any,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  metaText: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    marginLeft: 4,
  },
  summary: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
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
