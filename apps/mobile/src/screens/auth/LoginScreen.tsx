import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList, UILanguage } from '../../types';
import { Colors, FontSizes, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: { navigation: Nav }) {
  const { login, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim()) { setError(t(lang, 'errorInvalidEmail')); return; }
    if (!password) { setError(t(lang, 'errorWeakPassword')); return; }
    setLoading(true);
    const err = await login(email.trim(), password);
    setLoading(false);
    if (err) setError(t(lang, err as any));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{t(lang, 'signIn')}</Text>

          <AppTextInput
            label={t(lang, 'email')}
            value={email}
            onChangeText={setEmail}
            placeholder="hello@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AppTextInput
            label={t(lang, 'password')}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotRow}>
            <Text style={styles.link}>{t(lang, 'forgotPassword')}</Text>
          </TouchableOpacity>

          <AppButton label={t(lang, 'signIn')} onPress={handleLogin} loading={loading} style={styles.btn} />

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{t(lang, 'noAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>{t(lang, 'signUp')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  container: { padding: Spacing.xl, paddingTop: Spacing.xxl },
  title: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xl },
  error: { color: Colors.danger, fontSize: FontSizes.sm, marginBottom: Spacing.md },
  forgotRow: { alignSelf: 'flex-end', marginBottom: Spacing.lg },
  btn: { marginBottom: Spacing.lg },
  switchRow: { flexDirection: 'row', justifyContent: 'center' },
  switchText: { color: Colors.textSecondary, fontSize: FontSizes.sm },
  link: { color: Colors.primary, fontSize: FontSizes.sm, fontWeight: '700' },
});
