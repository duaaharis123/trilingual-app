import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { CATEGORIES } from '../../data/categories';
import { wordsByCategory } from '../../data/vocabulary';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

// US-014: Category grid — image-based, tap to explore
export default function CategoryGridScreen({ navigation }: { navigation: any }) {
  const { parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>{t(lang, 'categories')}</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const count = wordsByCategory(item.id).length;
          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate('WordList', { categoryId: item.id })}
              activeOpacity={0.85}
              accessibilityLabel={item.label[lang]}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.label}>{item.label[lang]}</Text>
              <Text style={styles.count}>{count} {t(lang, 'words')}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, padding: Spacing.lg, paddingBottom: Spacing.sm },
  grid: { padding: Spacing.md },
  row: { gap: Spacing.md, marginBottom: Spacing.md },
  card: { flex: 1, borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', minHeight: 140, justifyContent: 'center', ...Shadows.card },
  emoji: { fontSize: 52 },
  label: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.white, marginTop: Spacing.sm, textAlign: 'center' },
  count: { fontSize: FontSizes.xs, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
});
