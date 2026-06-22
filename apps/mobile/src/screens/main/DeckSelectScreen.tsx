import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CardProgress, UILanguage } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { CATEGORIES } from '../../data/categories';
import { wordsByCategory, WORDS } from '../../data/vocabulary';
import { SRSService } from '../../services/srs';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

interface Deck {
  id: string;
  label: string;
  emoji: string;
  count: number;
  color: string;
}

// US-029: Pre-built decks, US-031: Favourites deck
export default function DeckSelectScreen({ navigation }: { navigation: any }) {
  const { activeChild, parent } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';
  const [favCount, setFavCount] = useState(0);
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    if (!activeChild) return;
    (async () => {
      const cards: CardProgress[] = await SRSService.getAllCards(activeChild.id, WORDS.map(w => w.id));
      setFavCount(cards.filter(c => c.isFavourite).length);
      setDueCount(cards.filter(c => SRSService.isDue(c) && c.repetitions > 0).length);
    })();
  }, [activeChild]);

  const decks: Deck[] = [
    { id: 'due',        label: t(lang, 'dueForReview'), emoji: '⏰', count: dueCount, color: Colors.warning },
    { id: 'favourites', label: t(lang, 'favourites'),   emoji: '⭐', count: favCount, color: Colors.accent  },
    ...CATEGORIES.filter(c => wordsByCategory(c.id).length > 0).map(c => ({
      id: c.id,
      label: c.label[lang],
      emoji: c.emoji,
      count: wordsByCategory(c.id).length,
      color: c.color,
    })),
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>{t(lang, 'selectDeck')}</Text>
      <FlatList
        data={decks}
        keyExtractor={d => d.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('FlashcardSession', { categoryId: item.id })}
            activeOpacity={0.85}
            disabled={item.count === 0}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardCount}>{t(lang, 'cardCount', { n: item.count })}</Text>
            </View>
            <Text style={[styles.chevron, item.count === 0 && styles.disabled]}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.textPrimary, padding: Spacing.lg, paddingBottom: Spacing.sm },
  list: { padding: Spacing.md, gap: Spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.md, ...Shadows.card },
  iconBox: { width: 52, height: 52, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  cardEmoji: { fontSize: 28 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.textPrimary },
  cardCount: { fontSize: FontSizes.sm, color: Colors.textSecondary, marginTop: 2 },
  chevron: { fontSize: 24, color: Colors.textMuted },
  disabled: { opacity: 0.3 },
});
