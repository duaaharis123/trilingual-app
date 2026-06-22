import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { AVATARS } from '../../data/avatars';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

// US-071, US-072: Progress dashboard; US-077 child-lock handled at nav level
export default function ParentDashboardScreen({ navigation }: { navigation: any }) {
  const { parent, children, activeChild, logout, selectChild, removeChild } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const handleLogout = () => {
    Alert.alert(t(lang, 'signOut'), '', [
      { text: t(lang, 'cancel'), style: 'cancel' },
      { text: t(lang, 'signOut'), style: 'destructive', onPress: logout },
    ]);
  };

  const handleRemoveChild = (childId: string, name: string) => {
    Alert.alert(`Remove "${name}"?`, 'This will delete all their progress.', [
      { text: t(lang, 'cancel'), style: 'cancel' },
      { text: t(lang, 'delete'), style: 'destructive', onPress: () => removeChild(childId) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t(lang, 'parentDashboard')}</Text>
        <Text style={styles.subtitle}>{parent?.displayName ?? ''}</Text>

        {/* Profiles (US-006, US-081) */}
        <Text style={styles.section}>{t(lang, 'manageProfiles')}</Text>
        {children.map(child => {
          const avatar = AVATARS.find(a => a.id === child.avatarId) ?? AVATARS[0];
          const isActive = activeChild?.id === child.id;
          return (
            <View key={child.id} style={[styles.profileCard, isActive && styles.profileCardActive]}>
              <TouchableOpacity style={styles.profileRow} onPress={() => selectChild(child)}>
                <Text style={styles.avatar}>{avatar.emoji}</Text>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{child.name} {isActive ? '✓' : ''}</Text>
                  <Text style={styles.profileSub}>Age {child.age} · ⭐ {child.stars} · 🔥 {child.streakDays}</Text>
                </View>
              </TouchableOpacity>

              {/* Per-language progress (US-072) */}
              <View style={styles.langProgress}>
                {(['en', 'ar', 'ur'] as const).map(l => (
                  <View key={l} style={styles.langBadge}>
                    <Text style={styles.langFlag}>{l === 'en' ? '🇬🇧' : l === 'ar' ? '🇸🇦' : '🇵🇰'}</Text>
                    <Text style={styles.langPct}>{l === child.primaryLanguage ? '✓ known' : 'learning'}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveChild(child.id, child.name)}>
                <Text style={styles.removeBtnText}>{t(lang, 'delete')}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {children.length < 4 && (
          <TouchableOpacity style={styles.addCard}>
            <Text style={styles.addIcon}>＋ {t(lang, 'addChild')}</Text>
          </TouchableOpacity>
        )}
        {children.length === 4 && (
          <Text style={styles.maxNote}>{t(lang, 'maxChildren')}</Text>
        )}

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout}>
          <Text style={styles.signOutText}>{t(lang, 'signOut')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { fontSize: FontSizes.sm, color: Colors.textSecondary, marginBottom: Spacing.xl },
  section: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.md },
  profileCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, marginBottom: Spacing.md, overflow: 'hidden', borderWidth: 2, borderColor: Colors.border, ...Shadows.card },
  profileCardActive: { borderColor: Colors.primary },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: Spacing.md },
  avatar: { fontSize: 44 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  profileSub: { fontSize: FontSizes.sm, color: Colors.textSecondary, marginTop: 2 },
  langProgress: { flexDirection: 'row', paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm, gap: Spacing.md },
  langBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  langFlag: { fontSize: 16 },
  langPct: { fontSize: FontSizes.xs, color: Colors.textSecondary },
  removeBtn: { margin: Spacing.sm, padding: Spacing.sm, alignItems: 'center' },
  removeBtnText: { color: Colors.danger, fontSize: FontSizes.sm, fontWeight: '600' },
  addCard: { borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed', borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', marginBottom: Spacing.md },
  addIcon: { color: Colors.primary, fontSize: FontSizes.md, fontWeight: '700' },
  maxNote: { fontSize: FontSizes.sm, color: Colors.textMuted, textAlign: 'center', marginBottom: Spacing.md },
  signOutBtn: { marginTop: Spacing.xl, padding: Spacing.md, alignItems: 'center' },
  signOutText: { color: Colors.danger, fontSize: FontSizes.md, fontWeight: '700' },
});
