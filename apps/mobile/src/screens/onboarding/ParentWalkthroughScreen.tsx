import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

const STEPS = [
  { icon: '👶', titleKey: 'walkthroughStep1Title', bodyKey: 'walkthroughStep1Body' },
  { icon: '⏱️', titleKey: 'walkthroughStep2Title', bodyKey: 'walkthroughStep2Body' },
  { icon: '🎮', titleKey: 'walkthroughStep3Title', bodyKey: 'walkthroughStep3Body' },
] as const;

// US-012: Parent walkthrough — US-013: Skip option
export default function ParentWalkthroughScreen() {
  const { completeParentWalkthrough, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';
  const [step, setStep] = useState(0);

  const current = STEPS[step];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Skip (US-013) */}
      <TouchableOpacity style={styles.skipBtn} onPress={() => completeParentWalkthrough(true)}>
        <Text style={styles.skipText}>{t(lang, 'skip')}</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.icon}>{current.icon}</Text>
        <Text style={styles.title}>{t(lang, current.titleKey)}</Text>
        <Text style={styles.body}>{t(lang, current.bodyKey)}</Text>

        {/* Dots */}
        <View style={styles.dotRow}>
          {STEPS.map((_, i) => <View key={i} style={[styles.dot, i === step && styles.dotActive]} />)}
        </View>

        {step < STEPS.length - 1
          ? <AppButton label={t(lang, 'next')} onPress={() => setStep(s => s + 1)} style={styles.btn} />
          : <AppButton label={t(lang, 'done')} onPress={() => completeParentWalkthrough(false)} style={styles.btn} />
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  skipBtn: { alignSelf: 'flex-end', padding: Spacing.lg },
  skipText: { color: Colors.textSecondary, fontSize: FontSizes.sm, fontWeight: '600' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  icon: { fontSize: 100, marginBottom: Spacing.xl },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing.md },
  body: { fontSize: FontSizes.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 26, marginBottom: Spacing.xl },
  dotRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { width: 24, backgroundColor: Colors.primary, borderRadius: Radius.full },
  btn: { width: '100%' },
});
