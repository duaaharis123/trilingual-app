import type { CardProgress } from '../types';
import { Storage } from './storage';

// Simplified SM-2 spaced repetition
function applyRating(card: CardProgress, rating: 'easy' | 'okay' | 'hard'): CardProgress {
  const q = rating === 'easy' ? 5 : rating === 'okay' ? 3 : 1;
  let { easeFactor, interval, repetitions } = card;

  if (q < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  }

  const due = new Date();
  due.setDate(due.getDate() + interval);

  return { ...card, easeFactor, interval, repetitions, dueDate: due.toISOString(), lastRating: rating };
}

function defaultCard(wordId: string, childId: string): CardProgress {
  return {
    wordId,
    childId,
    easeFactor: 2.5,
    interval: 1,
    dueDate: new Date().toISOString(),
    repetitions: 0,
    isFavourite: false,
    lastRating: null,
  };
}

export const SRSService = {
  async getCard(childId: string, wordId: string): Promise<CardProgress> {
    return (await Storage.get<CardProgress>(`card:${childId}:${wordId}`)) ?? defaultCard(wordId, childId);
  },

  async getAllCards(childId: string, wordIds: string[]): Promise<CardProgress[]> {
    return Promise.all(wordIds.map(id => SRSService.getCard(childId, id)));
  },

  async rateCard(childId: string, wordId: string, rating: 'easy' | 'okay' | 'hard'): Promise<CardProgress> {
    const card = await SRSService.getCard(childId, wordId);
    const updated = applyRating(card, rating);
    await Storage.set(`card:${childId}:${wordId}`, updated);
    return updated;
  },

  async toggleFavourite(childId: string, wordId: string): Promise<boolean> {
    const card = await SRSService.getCard(childId, wordId);
    const updated = { ...card, isFavourite: !card.isFavourite };
    await Storage.set(`card:${childId}:${wordId}`, updated);
    return updated.isFavourite;
  },

  isDue(card: CardProgress): boolean {
    return new Date(card.dueDate) <= new Date();
  },
};
