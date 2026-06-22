import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { AVATARS } from '../../data/avatars';
import { WORDS } from '../../data/vocabulary';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

function greeting(): 'goodMorning' | 'goodAfternoon' | 'goodEvening' {
  const h = new Date().getHours();
  if (h < 12) return 'goodMorning';
  if (h < 17) return 'goodAfternoon';
  return 'goodEvening';
}

// US-065: streak, US-110: word of day
export default function HomeScreen({ navigation }: { navigation: any }) {
  const { activeChild, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const avatar = AVATARS.find(a => a.id === activeChild?.avatarId) ?? AVATARS[0];

  // Word of the day — deterministic per calendar date
  const wordOfDay = useMemo(() => {
    const idx = Math.floor(Date.now() / 86400000) % WORDS.length;
    return WORDS[idx];
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>{t(lang, greeting())},</Text>
            <Text style={styles.childName}>{activeChild?.name ?? ''} {avatar.emoji}</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {activeChild?.streakDays ?? 0}</Text>
          </View>
        </View>

        {/* Stars */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>⭐ {activeChild?.stars ?? 0}</Text>
            <Text style={styles.statLabel}>{t(lang, 'totalStars')}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 {activeChild?.streakDays ?? 0}</Text>
            <Text style={styles.statLabel}>streak</Text>
          </View>
        </View>

        {/* Word of the Day */}
        <Text style={styles.sectionTitle}>{t(lang, 'wordOfDay')}</Text>
        <TouchableOpacity style={styles.wodCard} onPress={() => navigation.navigate('Learn', { screen: 'WordDetail', params: { wordId: wordOfDay.id, categoryId: wordOfDay.categoryId } })} activeOpacity={0.85}>
          <Text style={styles.wodEmoji}>{wordOfDay.emoji}</Text>
          <View style={styles.wodText}>
            <Text style={styles.wodEn}>{wordOfDay.text.en}</Text>
            <Text style={styles.wodAr}>{wordOfDay.text.ar}</Text>
            <Text style={styles.wodUr}>{wordOfDay.text.ur}</Text>
          </View>
        </TouchableOpacity>

        {/* Quick links */}
        <Text style={styles.sectionTitle}>{t(lang, 'keepLearning')}</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: Colors.cat.animals }]} onPress={() => navigation.navigate('Learn')}>
            <Text style={styles.quickIcon}>📚</Text>
            <Text style={styles.quickLabel}>{t(lang, 'categories')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: Colors.primary }]} onPress={() => navigation.navigate('Flashcards')}>
            <Text style={styles.quickIcon}>🃏</Text>
            <Text style={styles.quickLabel}>{t(lang, 'flashcards')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  greetingText: { fontSize: FontSizes.sm, color: Colors.textSecondary },
  childName: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary },
  streakBadge: { backgroundColor: Colors.accent, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs },
  streakText: { fontSize: FontSizes.md, fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.lg },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', ...Shadows.card },
  statValue: { fontSize: FontSizes.xl, fontWeight: '800' },
  statLabel: { fontSize: FontSizes.xs, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md },
  wodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.xl, gap: Spacing.md, ...Shadows.card },
  wodEmoji: { fontSize: 64 },
  wodText: { flex: 1 },
  wodEn: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary },
  wodAr: { fontSize: FontSizes.lg, color: Colors.textSecondary, fontFamily: 'Amiri', textAlign: 'right' },
  wodUr: { fontSize: FontSizes.lg, color: Colors.textSecondary, fontFamily: 'NotoNastaliqUrdu', textAlign: 'right' },
  quickRow: { flexDirection: 'row', gap: Spacing.md },
  quickCard: { flex: 1, borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', minHeight: 100, justifyContent: 'center' },
  quickIcon: { fontSize: 40 },
  quickLabel: { color: Colors.white, fontWeight: '700', marginTop: Spacing.xs, fontSize: FontSizes.md },
});
