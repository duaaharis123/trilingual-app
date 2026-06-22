import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ContentLanguage, UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Spacing } from '../../theme';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import { AVATARS } from '../../data/avatars';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

const LANGS: { code: ContentLanguage; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'ur', flag: '🇵🇰', label: 'اردو' },
];

const STEPS = 4;

// US-006 to US-010: Create child profile — name, age, avatar, languages, username
export default function CreateChildScreen() {
  const { addChild, children, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [avatarId, setAvatarId] = useState(AVATARS[0].id);
  const [primaryLang, setPrimaryLang] = useState<ContentLanguage>('en');
  const [learningLangs, setLearningLangs] = useState<ContentLanguage[]>(['ar', 'ur']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLearning = (code: ContentLanguage) => {
    if (code === primaryLang) return;
    setLearningLangs(prev =>
      prev.includes(code) ? prev.filter(l => l !== code) : [...prev.filter(l => l !== code), code].slice(0, 2)
    );
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!name.trim()) { setError(t(lang, 'errorRequired')); return; }
      if (!age || isNaN(Number(age)) || Number(age) < 2 || Number(age) > 14) { setError('Please enter age between 2 and 14.'); return; }
    }
    if (step < STEPS) { setStep(s => s + 1); return; }
    // Final step — save
    handleSave();
  };

  const handleSave = async () => {
    setLoading(true);
    await addChild({
      name: name.trim(),
      username: username.trim() || undefined,
      age: Number(age),
      avatarId,
      primaryLanguage: primaryLang,
      learningLanguages: (learningLangs.length === 2 ? learningLangs : ['ar', 'ur']) as [ContentLanguage, ContentLanguage],
      showTransliteration: true,
      autoplayAudio: true,
    });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Step indicator */}
      <View style={styles.stepRow}>
        {Array.from({ length: STEPS }, (_, i) => (
          <View key={i} style={[styles.dot, i + 1 <= step && styles.dotActive]} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Step 1: Name + Age */}
        {step === 1 && (
          <>
            <Text style={styles.title}>{t(lang, 'addChild')}</Text>
            <AppTextInput label={t(lang, 'childName')} value={name} onChangeText={setName} placeholder={t(lang, 'namePlaceholder')} />
            <AppTextInput label={t(lang, 'childAge')} value={age} onChangeText={setAge} placeholder={t(lang, 'agePlaceholder')} keyboardType="numeric" />
            <AppTextInput label={t(lang, 'username')} value={username} onChangeText={setUsername} placeholder={t(lang, 'usernamePlaceholder')} autoCapitalize="none" />
          </>
        )}

        {/* Step 2: Avatar (US-009) */}
        {step === 2 && (
          <>
            <Text style={styles.title}>{t(lang, 'chooseAvatar')}</Text>
            <View style={styles.avatarGrid}>
              {AVATARS.map(a => (
                <TouchableOpacity key={a.id} style={[styles.avatarBtn, avatarId === a.id && styles.avatarBtnActive]} onPress={() => setAvatarId(a.id)}>
                  <Text style={styles.avatarEmoji}>{a.emoji}</Text>
                  <Text style={styles.avatarLabel}>{a.label[lang] ?? a.label.en}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Step 3: Primary language (US-008) */}
        {step === 3 && (
          <>
            <Text style={styles.title}>{t(lang, 'primaryLanguage')}</Text>
            <View style={styles.langGroup}>
              {LANGS.map(l => (
                <TouchableOpacity key={l.code} style={[styles.langBtn, primaryLang === l.code && styles.langBtnActive]} onPress={() => setPrimaryLang(l.code)}>
                  <Text style={styles.langFlag}>{l.flag}</Text>
                  <Text style={[styles.langLabel, primaryLang === l.code && styles.langLabelActive]}>{l.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.title, { marginTop: Spacing.xl }]}>{t(lang, 'learningLanguages')}</Text>
            <View style={styles.langGroup}>
              {LANGS.filter(l => l.code !== primaryLang).map(l => (
                <TouchableOpacity key={l.code} style={[styles.langBtn, learningLangs.includes(l.code) && styles.langBtnActive]} onPress={() => toggleLearning(l.code)}>
                  <Text style={styles.langFlag}>{l.flag}</Text>
                  <Text style={[styles.langLabel, learningLangs.includes(l.code) && styles.langLabelActive]}>{l.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Step 4: Summary */}
        {step === 4 && (
          <>
            <Text style={styles.title}>{t(lang, 'done')} 🎉</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryEmoji}>{AVATARS.find(a => a.id === avatarId)?.emoji}</Text>
              <Text style={styles.summaryName}>{name}</Text>
              <Text style={styles.summaryDetail}>Age: {age} · {primaryLang.toUpperCase()} → {learningLangs.join(' + ').toUpperCase()}</Text>
            </View>
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>

      <View style={styles.footer}>
        {step > 1 && <AppButton label={t(lang, 'back')} variant="ghost" onPress={() => setStep(s => s - 1)} style={styles.backBtn} />}
        <AppButton
          label={step === STEPS ? t(lang, 'save') : t(lang, 'next')}
          onPress={handleNext}
          loading={loading}
          style={styles.nextBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  stepRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingTop: Spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { backgroundColor: Colors.primary },
  container: { padding: Spacing.xl, paddingBottom: 100 },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.lg },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center' },
  avatarBtn: { width: 80, height: 90, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white },
  avatarBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  avatarEmoji: { fontSize: 36 },
  avatarLabel: { fontSize: FontSizes.xs, color: Colors.textSecondary, marginTop: 4 },
  langGroup: { gap: Spacing.sm },
  langBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border, backgroundColor: Colors.white },
  langBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  langFlag: { fontSize: 24 },
  langLabel: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.textSecondary },
  langLabelActive: { color: Colors.primary },
  summaryCard: { alignItems: 'center', padding: Spacing.xl, borderRadius: Radius.lg, backgroundColor: Colors.white, ...require('../../theme').Shadows.card },
  summaryEmoji: { fontSize: 80 },
  summaryName: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary, marginTop: Spacing.sm },
  summaryDetail: { fontSize: FontSizes.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  error: { color: Colors.danger, fontSize: FontSizes.sm, marginTop: Spacing.md },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: Spacing.lg, gap: Spacing.md, backgroundColor: Colors.background },
  backBtn: { flex: 1 },
  nextBtn: { flex: 2 },
});
