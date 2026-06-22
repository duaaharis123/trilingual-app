import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

// US-003: Privacy consent required before child profile creation
export default function PrivacyConsentScreen() {
  const { acceptPrivacy, logout, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.icon}>🔐</Text>
        <Text style={styles.title}>{t(lang, 'privacyTitle')}</Text>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.body}>{t(lang, 'privacyBody')}</Text>
        </ScrollView>

        <View style={styles.actions}>
          <AppButton label={t(lang, 'privacyAgree')} onPress={acceptPrivacy} />
          <AppButton label={t(lang, 'privacyDecline')} variant="ghost" onPress={logout} style={styles.mt} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.xl },
  icon: { fontSize: 64, textAlign: 'center', marginBottom: Spacing.md },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing.lg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: Spacing.lg },
  body: { fontSize: FontSizes.md, color: Colors.textSecondary, lineHeight: 26 },
  actions: { paddingTop: Spacing.lg },
  mt: { marginTop: Spacing.md },
});
