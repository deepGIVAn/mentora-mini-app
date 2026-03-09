import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ApiService } from '../../services/api';
import { Session } from '../../types';
import { Theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { ChevronLeft, Calendar, BookOpen, Clock } from 'lucide-react-native';

export const SessionDetailScreen = ({ route, navigation }: any) => {
  const { sessionId } = route.params;
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.getSessionDetail(sessionId);
        setSession(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [sessionId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!session) {
    return (
      <View style={styles.container}>
        <Text>Session not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Session Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.topic}>{session.topic}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Calendar size={18} color={Theme.colors.primary} />
            <Text style={styles.metaText}>{session.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={18} color={Theme.colors.primary} />
            <Text style={styles.metaText}>45 mins</Text>
          </View>
        </View>

        <Card style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <BookOpen size={20} color={Theme.colors.primary} />
            <Text style={styles.cardTitle}>Session Summary</Text>
          </View>
          <Text style={styles.summaryText}>{session.summary}</Text>
          
          <Text style={styles.summaryText}>
            Today we explored the core concepts of the topic. The student was engaged and showed strong progress in 
            understanding the underlying principles. We will continue from here in our next meeting.
          </Text>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Mental Mini App Demo - Next session scheduled for next week.</Text>
        </View>
      </ScrollView>
    </View>
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
  content: {
    padding: Theme.spacing.lg,
  },
  topic: {
    fontSize: 24,
    fontWeight: '700' as any,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.xl,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.xl,
  },
  metaText: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  summaryCard: {
    padding: Theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600' as any,
    color: Theme.colors.text,
    marginLeft: Theme.spacing.sm,
  },
  summaryText: {
    fontSize: 15,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: Theme.spacing.md,
  },
  footer: {
    marginTop: Theme.spacing.xl,
    padding: Theme.spacing.md,
    backgroundColor: '#fff',
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  footerText: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});
