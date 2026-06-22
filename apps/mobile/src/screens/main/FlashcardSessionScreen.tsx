import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CardProgress, UILanguage, Word } from '../../types';
import { Colors, FontSizes, Radius, Shadows, Spacing } from '../../theme';
import { wordsByCategory, WORDS } from '../../data/vocabulary';
import { SRSService } from '../../services/srs';
import { TTSService } from '../../services/tts';
import AppButton from '../../components/AppButton';
import LanguageWord from '../../components/LanguageWord';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../i18n';

// US-024: Flip animation, US-025: Swipe prev/next, US-026: Rate Easy/Okay/Hard
// US-031: Favourite, US-033: SRS, US-027: Autoplay

export default function FlashcardSessionScreen({ route, navigation }: { route: any; navigation: any }) {
  const { categoryId } = route.params as { categoryId: string };
  const { activeChild, parent, updateChild } = useApp();
  const lang: UILanguage = parent?.uiLanguage ?? 'en';

  const [words, setWords] = useState<Word[]>([]);
  const [cards, setCards] = useState<Map<string, CardProgress>>(new Map());
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Flip animation
  const flipAnim = useRef(new Animated.Value(0)).current;
  const frontInterp = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backInterp  = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  useEffect(() => {
    if (!activeChild) return;
    let wordList: Word[];
    if (categoryId === 'favourites') {
      wordList = []; // loaded async below
    } else if (categoryId === 'due') {
      wordList = []; // loaded async below
    } else {
      wordList = wordsByCategory(categoryId);
    }

    (async () => {
      if (categoryId === 'favourites' || categoryId === 'due') {
        const allCards = await SRSService.getAllCards(activeChild.id, WORDS.map(w => w.id));
        const filtered = categoryId === 'favourites'
          ? allCards.filter(c => c.isFavourite)
          : allCards.filter(c => SRSService.isDue(c) && c.repetitions > 0);
        wordList = filtered.map(c => WORDS.find(w => w.id === c.wordId)!).filter(Boolean);
      }

      const cardMap = new Map<string, CardProgress>();
      for (const w of wordList) {
        const card = await SRSService.getCard(activeChild.id, w.id);
        cardMap.set(w.id, card);
      }
      setWords(wordList);
      setCards(cardMap);
      if (wordList[0]) {
        setIsFav(cardMap.get(wordList[0].id)?.isFavourite ?? false);
        // Autoplay first word audio
        TTSService.speak(wordList[0].text.en, 'en');
      }
    })();
  }, [categoryId, activeChild]);

  const word = words[index];

  const doFlip = useCallback(() => {
    Animated.timing(flipAnim, { toValue: flipped ? 0 : 1, duration: 350, useNativeDriver: true }).start();
    setFlipped(f => !f);
    if (!flipped && word) TTSService.speak(word.text.ar, 'ar');
  }, [flipped, word, flipAnim]);

  const goNext = () => {
    if (index >= words.length - 1) { setSessionDone(true); return; }
    flipAnim.setValue(0);
    setFlipped(false);
    const nextIdx = index + 1;
    setIndex(nextIdx);
    setIsFav(cards.get(words[nextIdx].id)?.isFavourite ?? false);
    TTSService.speak(words[nextIdx].text.en, 'en');
  };

  const goPrev = () => {
    if (index <= 0) return;
    flipAnim.setValue(0);
    setFlipped(false);
    const prevIdx = index - 1;
    setIndex(prevIdx);
    setIsFav(cards.get(words[prevIdx].id)?.isFavourite ?? false);
  };

  const rate = async (rating: 'easy' | 'okay' | 'hard') => {
    if (!activeChild || !word) return;
    await SRSService.rateCard(activeChild.id, word.id, rating);
    const stars = rating === 'easy' ? 3 : rating === 'okay' ? 1 : 0;
    setStarsEarned(s => s + stars);
    setReviewed(r => r + 1);
    goNext();
  };

  const toggleFav = async () => {
    if (!activeChild || !word) return;
    const newFav = await SRSService.toggleFavourite(activeChild.id, word.id);
    setIsFav(newFav);
    cards.set(word.id, { ...cards.get(word.id)!, isFavourite: newFav });
  };

  // Auto-play (US-027)
  useEffect(() => {
    if (!autoPlay || !word) return;
    autoPlayTimer.current = setTimeout(() => {
      if (!flipped) doFlip();
      else { rate('okay'); }
    }, 2500);
    return () => { if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current); };
  }, [autoPlay, index, flipped]);

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>{t(lang, 'noWordsYet')}</Text>
          <AppButton label={t(lang, 'backToDecks')} onPress={() => navigation.goBack()} style={styles.btn} />
        </View>
      </SafeAreaView>
    );
  }

  if (sessionDone) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.doneContainer}>
          <Text style={styles.doneIcon}>🎉</Text>
          <Text style={styles.doneTitle}>{t(lang, 'sessionComplete')}</Text>
          <Text style={styles.doneSub}>{t(lang, 'wordsReviewed', { n: reviewed })}</Text>
          <Text style={styles.doneSub}>{t(lang, 'starsEarned', { n: starsEarned })}</Text>
          <AppButton label={t(lang, 'studyAgain')} onPress={() => { setIndex(0); setFlipped(false); setSessionDone(false); flipAnim.setValue(0); }} style={styles.btn} />
          <AppButton label={t(lang, 'backToDecks')} variant="ghost" onPress={() => navigation.goBack()} style={[styles.btn, { marginTop: Spacing.sm }]} />
        </View>
      </SafeAreaView>
    );
  }

  if (!word) return null;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${((index + 1) / words.length) * 100}%` }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.closeBtn}>✕</Text></TouchableOpacity>
        <Text style={styles.counter}>{index + 1} / {words.length}</Text>
        <TouchableOpacity onPress={toggleFav}><Text style={styles.favBtn}>{isFav ? '⭐' : '☆'}</Text></TouchableOpacity>
      </View>

      {/* Flip card (US-024) */}
      <TouchableOpacity onPress={doFlip} activeOpacity={0.95} style={styles.cardWrapper}>
        {/* Front */}
        <Animated.View style={[styles.card, styles.cardFront, { transform: [{ rotateY: frontInterp }] }]}>
          <Text style={styles.hint}>{t(lang, 'tapToFlip')}</Text>
          <Text style={styles.bigEmoji}>{word.emoji}</Text>
          <Text style={styles.wordEn}>{word.text.en}</Text>
        </Animated.View>

        {/* Back */}
        <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterp }] }]}>
          <LanguageWord lang="ar" word={word.text.ar} romanized={word.romanized?.ar} showRomanized large />
          <View style={styles.divider} />
          <LanguageWord lang="ur" word={word.text.ur} romanized={word.romanized?.ur} showRomanized large />
        </Animated.View>
      </TouchableOpacity>

      {/* Navigation arrows (US-025) */}
      <View style={styles.navRow}>
        <TouchableOpacity onPress={goPrev} disabled={index === 0} style={[styles.navBtn, index === 0 && styles.navDisabled]}>
          <Text style={styles.navIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAutoPlay(a => !a)} style={[styles.autoBtn, autoPlay && styles.autoBtnOn]}>
          <Text style={styles.autoText}>{t(lang, 'autoPlay')} {autoPlay ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goNext} style={styles.navBtn}>
          <Text style={styles.navIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Rating buttons (US-026) — shown only after flip */}
      {flipped && (
        <View style={styles.ratingRow}>
          <TouchableOpacity style={[styles.rateBtn, styles.rateBtnHard]} onPress={() => rate('hard')}>
            <Text style={styles.rateBtnText}>{t(lang, 'hard')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rateBtn, styles.rateBtnOkay]} onPress={() => rate('okay')}>
            <Text style={styles.rateBtnText}>{t(lang, 'okay')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rateBtn, styles.rateBtnEasy]} onPress={() => rate('easy')}>
            <Text style={styles.rateBtnText}>{t(lang, 'easy')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  progressBg: { height: 4, backgroundColor: Colors.border },
  progressFill: { height: 4, backgroundColor: Colors.primary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md },
  closeBtn: { fontSize: 20, color: Colors.textSecondary, fontWeight: '700', padding: Spacing.sm },
  counter: { fontSize: FontSizes.sm, color: Colors.textSecondary, fontWeight: '700' },
  favBtn: { fontSize: 26, padding: Spacing.sm },
  cardWrapper: { flex: 1, margin: Spacing.lg },
  card: { position: 'absolute', width: '100%', height: '100%', borderRadius: Radius.xl, backfaceVisibility: 'hidden', alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, ...Shadows.card },
  cardFront: { backgroundColor: Colors.white },
  cardBack: { backgroundColor: Colors.primaryLight },
  hint: { position: 'absolute', top: Spacing.lg, fontSize: FontSizes.xs, color: Colors.textMuted },
  bigEmoji: { fontSize: 110, marginBottom: Spacing.lg },
  wordEn: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: Spacing.md },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  navBtn: { width: 52, height: 52, borderRadius: Radius.full, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', ...Shadows.card },
  navDisabled: { opacity: 0.3 },
  navIcon: { fontSize: 22, color: Colors.primary, fontWeight: '700' },
  autoBtn: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.full, borderWidth: 2, borderColor: Colors.border },
  autoBtnOn: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  autoText: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.md, paddingBottom: Spacing.xl },
  rateBtn: { flex: 1, borderRadius: Radius.full, paddingVertical: Spacing.md, alignItems: 'center' },
  rateBtnHard: { backgroundColor: Colors.danger },
  rateBtnOkay: { backgroundColor: Colors.warning },
  rateBtnEasy: { backgroundColor: Colors.success },
  rateBtnText: { color: Colors.white, fontWeight: '700', fontSize: FontSizes.sm },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyIcon: { fontSize: 72, marginBottom: Spacing.lg },
  emptyText: { fontSize: FontSizes.lg, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xl },
  doneContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  doneIcon: { fontSize: 96, marginBottom: Spacing.md },
  doneTitle: { fontSize: FontSizes.xxl, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.sm },
  doneSub: { fontSize: FontSizes.lg, color: Colors.textSecondary, marginBottom: Spacing.sm },
  btn: { width: '100%', marginTop: Spacing.lg },
});
