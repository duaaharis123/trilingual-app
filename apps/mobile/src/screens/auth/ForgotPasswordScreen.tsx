import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

export default function ForgotPasswordScreen() {
  const { resetPassword, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    if (!email.includes('@')) { setError(t(lang, 'errorInvalidEmail')); return; }
    setLoading(true);
    const ok = await resetPassword(email.trim());
    setLoading(false);
    if (ok) setSent(true);
    else setError(t(lang, 'errorWrongCredentials'));
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.icon}>📨</Text>
          <Text style={styles.title}>{t(lang, 'resetEmailSent')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{t(lang, 'resetPassword')}</Text>
        <AppTextInput label={t(lang, 'email')} value={email} onChangeText={setEmail} placeholder="hello@example.com" keyboardType="email-address" autoCapitalize="none" />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton label={t(lang, 'sendResetLink')} onPress={handleReset} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.xl, paddingTop: Spacing.xxl },
  icon: { fontSize: 64, textAlign: 'center', marginBottom: Spacing.lg },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xl },
  error: { color: Colors.danger, fontSize: FontSizes.sm, marginBottom: Spacing.md },
});
