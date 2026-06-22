import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ContentLanguage } from '../types';
import { Colors, FontSizes, Spacing } from '../theme';
import { TTSService } from '../services/tts';

const FLAG: Record<ContentLanguage, string> = { en: '🇬🇧', ar: '🇸🇦', ur: '🇵🇰' };
const LANG_LABEL: Record<ContentLanguage, string> = { en: 'English', ar: 'العربية', ur: 'اردو' };
const FONT_FAMILY: Partial<Record<ContentLanguage, string>> = { ar: 'Amiri', ur: 'NotoNastaliqUrdu' };

interface Props {
  lang: ContentLanguage;
  word: string;
  romanized?: string;
  showRomanized?: boolean;
  large?: boolean;
  onPress?: () => void;
}

export default function LanguageWord({ lang, word, romanized, showRomanized, large, onPress }: Props) {
  const isRTL = lang === 'ar' || lang === 'ur';
  const fontSize = large ? FontSizes.xxl : FontSizes.lg;

  const handlePress = () => {
    if (onPress) { onPress(); return; }
    TTSService.speak(word, lang);
  };

  return (
    <TouchableOpacity style={styles.row} onPress={handlePress} activeOpacity={0.7} accessibilityLabel={`${LANG_LABEL[lang]}: ${word}`}>
      <Text style={styles.flag}>{FLAG[lang]}</Text>
      <View style={styles.textBlock}>
        <Text style={[styles.word, { fontSize, fontFamily: FONT_FAMILY[lang], writingDirection: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }]}>
          {word}
        </Text>
        {showRomanized && romanized ? (
          <Text style={styles.romanized}>{romanized}</Text>
        ) : null}
      </View>
      <Text style={styles.speaker}>🔊</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  flag: { fontSize: 22 },
  textBlock: { flex: 1 },
  word: { color: Colors.textPrimary, fontWeight: '700' },
  romanized: { fontSize: FontSizes.xs, color: Colors.textSecondary, marginTop: 2, fontStyle: 'italic' },
  speaker: { fontSize: 18, color: Colors.textMuted },
});
