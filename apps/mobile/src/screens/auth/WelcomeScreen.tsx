import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList, UILanguage } from '../../types';
import { Colors, FontSizes, Spacing, Radius } from '../../theme';
import AppButton from '../../components/AppButton';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const LANGS: { code: UILanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ur', label: 'اردو',    flag: '🇵🇰' },
];

export default function WelcomeScreen({ navigation }: { navigation: Nav }) {
  const { parent, setUILanguage } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Mascot & title */}
        <Text style={styles.mascot}>🦉</Text>
        <Text style={styles.appName}>{t(lang, 'appName')}</Text>
        <Text style={styles.tagline}>{t(lang, 'tagline')}</Text>

        {/* Language picker (US-002) */}
        <View style={styles.langRow}>
          {LANGS.map(l => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langBtn, lang === l.code && styles.langBtnActive]}
              onPress={() => setUILanguage(l.code)}
              accessibilityLabel={l.label}
            >
              <Text style={styles.langFlag}>{l.flag}</Text>
              <Text style={[styles.langLabel, lang === l.code && styles.langLabelActive]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actions}>
          <AppButton label={t(lang, 'signIn')} onPress={() => navigation.navigate('Login')} />
          <AppButton label={t(lang, 'createAccount')} variant="ghost" onPress={() => navigation.navigate('Signup')} style={styles.mt} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  mascot: { fontSize: 96, marginBottom: Spacing.md },
  appName: { fontSize: FontSizes.hero, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.xs },
  tagline: { fontSize: FontSizes.md, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xl },
  langRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xxl },
  langBtn: { alignItems: 'center', padding: Spacing.sm, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border, minWidth: 80 },
  langBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  langFlag: { fontSize: 24 },
  langLabel: { fontSize: FontSizes.xs, fontWeight: '600', color: Colors.textSecondary, marginTop: 2 },
  langLabelActive: { color: Colors.primary },
  actions: { width: '100%' },
  mt: { marginTop: Spacing.md },
});
