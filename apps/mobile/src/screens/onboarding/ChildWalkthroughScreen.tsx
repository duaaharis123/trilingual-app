import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Radius, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';
import type { UILanguage } from '../../types';

const STEPS = [
  { icon: '📖', bodyKey: 'childWalkthroughStep1' },
  { icon: '🃏', bodyKey: 'childWalkthroughStep2' },
  { icon: '⭐', bodyKey: 'childWalkthroughStep3' },
] as const;

// US-011: Mascot-guided child first-launch walkthrough
export default function ChildWalkthroughScreen() {
  const { completeChildWalkthrough, activeChild, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';
  const [step, setStep] = useState(0);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Mascot */}
        <Text style={styles.mascot}>🦉</Text>
        {step === 0 && <Text style={styles.greeting}>{t(lang, 'childWalkthroughTitle')}</Text>}

        {/* Step card */}
        <View style={styles.card}>
          <Text style={styles.cardIcon}>{current.icon}</Text>
          <Text style={styles.cardText}>{t(lang, current.bodyKey)}</Text>
        </View>

        {/* Dots */}
        <View style={styles.dotRow}>
          {STEPS.map((_, i) => <View key={i} style={[styles.dot, i === step && styles.dotActive]} />)}
        </View>

        <AppButton
          label={isLast ? t(lang, 'letsGo') : t(lang, 'next')}
          onPress={isLast ? completeChildWalkthrough : () => setStep(s => s + 1)}
          style={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  mascot: { fontSize: 100 },
  greeting: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.primary, textAlign: 'center', marginTop: Spacing.md, marginBottom: Spacing.xl },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', width: '100%', marginBottom: Spacing.xl, ...require('../../theme').Shadows.card },
  cardIcon: { fontSize: 64, marginBottom: Spacing.md },
  cardText: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center', lineHeight: 28 },
  dotRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { width: 24, backgroundColor: Colors.accent, borderRadius: Radius.full },
  btn: { width: '100%' },
});
