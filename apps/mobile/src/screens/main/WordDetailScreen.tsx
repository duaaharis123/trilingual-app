import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ContentLanguage, UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { wordById } from '../../data/vocabulary';
import { TTSService } from '../../services/tts';
import LanguageWord from '../../components/LanguageWord';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

// US-016: Audio on tap, US-017: All 3 languages, US-018: Transliteration, US-021: Autoplay
export default function WordDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { wordId } = route.params as { wordId: string };
  const { parent, activeChild, updateChild } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const word = wordById(wordId);
  const [showRoman, setShowRoman] = useState(activeChild?.showTransliteration ?? true);

  // US-021: Autoplay on open
  useEffect(() => {
    if (word && (activeChild?.autoplayAudio ?? true)) {
      TTSService.speak(word.text.en, 'en');
    }
    return () => TTSService.stop();
  }, [wordId]);

  const playLang = (contentLang: ContentLanguage) => {
    if (!word) return;
    TTSService.speak(word.text[contentLang], contentLang);
  };

  if (!word) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Big emoji / illustration */}
        <View style={styles.imageCard}>
          <Text style={styles.bigEmoji}>{word.emoji}</Text>
        </View>

        {/* Transliteration toggle (US-018) */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>{t(lang, 'transliteration')}</Text>
          <Switch value={showRoman} onValueChange={setShowRoman} trackColor={{ true: Colors.primary }} thumbColor={Colors.white} />
        </View>

        {/* Three languages (US-017, US-019) */}
        <View style={styles.langCard}>
          <LanguageWord lang="en" word={word.text.en} large onPress={() => playLang('en')} />
          <View style={styles.divider} />
          <LanguageWord lang="ar" word={word.text.ar} romanized={word.romanized?.ar} showRomanized={showRoman} large onPress={() => playLang('ar')} />
          <View style={styles.divider} />
          <LanguageWord lang="ur" word={word.text.ur} romanized={word.romanized?.ur} showRomanized={showRoman} large onPress={() => playLang('ur')} />
        </View>

        {/* Play all button */}
        <TouchableOpacity style={styles.playAll} onPress={async () => {
          await TTSService.speak(word.text.en, 'en');
          setTimeout(() => TTSService.speak(word.text.ar, 'ar'), 1200);
          setTimeout(() => TTSService.speak(word.text.ur, 'ur'), 2400);
        }}>
          <Text style={styles.playAllText}>🔊 {t(lang, 'playAudio')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  backBtn: { marginBottom: Spacing.md },
  backIcon: { fontSize: 28, color: Colors.primary, fontWeight: '700' },
  imageCard: { backgroundColor: Colors.white, borderRadius: Radius.xl, alignItems: 'center', padding: Spacing.xxl, marginBottom: Spacing.lg, ...Shadows.card },
  bigEmoji: { fontSize: 120 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md, paddingHorizontal: Spacing.sm },
  toggleLabel: { fontSize: FontSizes.sm, color: Colors.textSecondary, fontWeight: '600' },
  langCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg, ...Shadows.card },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm },
  playAll: { backgroundColor: Colors.primary, borderRadius: Radius.full, padding: Spacing.md, alignItems: 'center' },
  playAllText: { color: Colors.white, fontWeight: '700', fontSize: FontSizes.md },
});
