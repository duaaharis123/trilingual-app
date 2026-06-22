import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import { AVATARS } from '../../data/avatars';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

export default function ProfileSelectScreen() {
  const { children, selectChild, addChild, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mascot}>🦉</Text>
        <Text style={styles.title}>{t(lang, 'whoIsLearning')}</Text>

        <View style={styles.grid}>
          {children.map(child => {
            const avatar = AVATARS.find(a => a.id === child.avatarId) ?? AVATARS[0];
            return (
              <TouchableOpacity key={child.id} style={styles.card} onPress={() => selectChild(child)} activeOpacity={0.8}>
                <Text style={styles.emoji}>{avatar.emoji}</Text>
                <Text style={styles.name}>{child.name}</Text>
                {child.streakDays > 0 && <Text style={styles.streak}>🔥 {child.streakDays}</Text>}
              </TouchableOpacity>
            );
          })}

          {children.length < 4 && (
            <TouchableOpacity style={[styles.card, styles.addCard]} onPress={() => { /* Navigate to CreateChild */ }}>
              <Text style={styles.addIcon}>＋</Text>
              <Text style={styles.addLabel}>{t(lang, 'addChild')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, alignItems: 'center' },
  mascot: { fontSize: 72, marginBottom: Spacing.sm },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xl, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center' },
  card: { width: 130, height: 150, borderRadius: Radius.lg, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', ...Shadows.card },
  emoji: { fontSize: 56 },
  name: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.sm },
  streak: { fontSize: FontSizes.sm, color: Colors.warning, marginTop: 2 },
  addCard: { borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed', backgroundColor: 'transparent' },
  addIcon: { fontSize: 40, color: Colors.primary },
  addLabel: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '700', marginTop: Spacing.xs },
});
