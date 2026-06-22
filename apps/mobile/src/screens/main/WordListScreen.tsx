import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { wordsByCategory } from '../../data/vocabulary';
import { CATEGORIES } from '../../data/categories';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

// US-015: Word list inside a category
export default function WordListScreen({ route, navigation }: { route: any; navigation: any }) {
  const { categoryId } = route.params as { categoryId: string };
  const { parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const category = CATEGORIES.find(c => c.id === categoryId);
  const words = wordsByCategory(categoryId);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.header, { backgroundColor: category?.color ?? Colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.catEmoji}>{category?.emoji}</Text>
        <Text style={styles.catName}>{category?.label[lang] ?? ''}</Text>
        <Text style={styles.wordCount}>{words.length} {t(lang, 'words')}</Text>
      </View>

      <FlatList
        data={words}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('WordDetail', { wordId: item.id, categoryId })}
            activeOpacity={0.85}
            accessibilityLabel={item.text.en}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.textCol}>
              <Text style={styles.en}>{item.text.en}</Text>
              <Text style={styles.ar}>{item.text.ar}</Text>
              <Text style={styles.ur}>{item.text.ur}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.lg, paddingTop: Spacing.xl, alignItems: 'center' },
  backBtn: { position: 'absolute', left: Spacing.lg, top: Spacing.xl },
  backIcon: { fontSize: 28, color: Colors.white, fontWeight: '700' },
  catEmoji: { fontSize: 56 },
  catName: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.white, marginTop: Spacing.xs },
  wordCount: { fontSize: FontSizes.sm, color: 'rgba(255,255,255,0.8)' },
  list: { padding: Spacing.md, gap: Spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.md, ...Shadows.card },
  emoji: { fontSize: 40 },
  textCol: { flex: 1 },
  en: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  ar: { fontSize: FontSizes.md, color: Colors.textSecondary, fontFamily: 'Amiri', textAlign: 'right' },
  ur: { fontSize: FontSizes.sm, color: Colors.textMuted, fontFamily: 'NotoNastaliqUrdu', textAlign: 'right' },
  chevron: { fontSize: 24, color: Colors.textMuted },
});
