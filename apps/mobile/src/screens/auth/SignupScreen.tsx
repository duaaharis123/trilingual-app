import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList, UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: { navigation: Nav }) {
  const { signup, loginWithGoogle, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');
    if (!name.trim()) { setError(t(lang, 'errorRequired')); return; }
    if (!email.includes('@')) { setError(t(lang, 'errorInvalidEmail')); return; }
    if (password.length < 6) { setError(t(lang, 'errorWeakPassword')); return; }
    if (password !== confirm) { setError(t(lang, 'errorPasswordMatch')); return; }
    setLoading(true);
    const err = await signup(email.trim(), password, name.trim(), lang);
    setLoading(false);
    if (err) setError(t(lang, err as any));
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    const err = await loginWithGoogle();
    setGoogleLoading(false);
    if (err) setError(t(lang, err as any));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{t(lang, 'createAccount')}</Text>

          <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn} disabled={googleLoading} activeOpacity={0.8}>
            {googleLoading ? (
              <ActivityIndicator size="small" color={Colors.textPrimary} />
            ) : (
              <>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleLabel}>{t(lang, 'continueWithGoogle')}</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t(lang, 'orContinueWith')}</Text>
            <View style={styles.dividerLine} />
          </View>

          <AppTextInput label={t(lang, 'yourName')} value={name} onChangeText={setName} placeholder={t(lang, 'namePlaceholder')} />
          <AppTextInput label={t(lang, 'email')} value={email} onChangeText={setEmail} placeholder="hello@example.com" keyboardType="email-address" autoCapitalize="none" />
          <AppTextInput label={t(lang, 'password')} value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <AppTextInput label={t(lang, 'confirmPassword')} value={confirm} onChangeText={setConfirm} placeholder="••••••••" secureTextEntry />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <AppButton label={t(lang, 'signUp')} onPress={handleSignup} loading={loading} style={styles.btn} />

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{t(lang, 'alreadyHaveAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>{t(lang, 'signIn')}</Text>
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
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: Spacing.sm, color: Colors.textMuted, fontSize: FontSizes.xs },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm + 4,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  googleIcon: { fontSize: FontSizes.md, fontWeight: '700', color: '#4285F4' },
  googleLabel: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.textPrimary },
  btn: { marginBottom: Spacing.lg },
  switchRow: { flexDirection: 'row', justifyContent: 'center' },
  switchText: { color: Colors.textSecondary, fontSize: FontSizes.sm },
  link: { color: Colors.primary, fontSize: FontSizes.sm, fontWeight: '700' },
});
