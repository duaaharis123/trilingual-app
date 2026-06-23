export type UILanguage = 'en' | 'ar' | 'ur';
export type ContentLanguage = 'en' | 'ar' | 'ur';

export interface TrilingualText {
  en: string;
  ar: string;
  ur: string;
}

export interface TrilingualRomanized {
  ar?: string; // Arabic romanized phonetics
  ur?: string; // Urdu romanized phonetics
}

export interface Avatar {
  id: string;
  emoji: string;
  label: TrilingualText;
}

export interface Category {
  id: string;
  emoji: string;
  label: TrilingualText;
  color: string;
}

export interface Word {
  id: string;
  categoryId: string;
  emoji: string;
  text: TrilingualText;
  romanized?: TrilingualRomanized;
}

export interface ParentAccount {
  id: string;        // Firebase UID
  email: string;
  displayName: string;
  privacyConsentAt: string | null;
  parentWalkthroughDone: boolean;
  uiLanguage: UILanguage;
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  username?: string;
  age: number;
  avatarId: string;
  primaryLanguage: ContentLanguage;
  learningLanguages: [ContentLanguage, ContentLanguage];
  showTransliteration: boolean;
  autoplayAudio: boolean;
  walkthroughDone: boolean;
  stars: number;
  streakDays: number;
  lastStudiedDate: string | null;
  createdAt: string;
}

// SRS card state per child per word
export interface CardProgress {
  wordId: string;
  childId: string;
  easeFactor: number;   // SM-2 ease factor (starts at 2.5)
  interval: number;     // days until next review
  dueDate: string;      // ISO date
  repetitions: number;
  isFavourite: boolean;
  lastRating: 'easy' | 'okay' | 'hard' | null;
}

// Navigation param lists
export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  ProfileSelect: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  PrivacyConsent: undefined;
  CreateChild: { editId?: string };
  ParentWalkthrough: undefined;
  ChildWalkthrough: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Learn: undefined;
  Flashcards: undefined;
  Parent: undefined;
};

export type LearnStackParamList = {
  CategoryGrid: undefined;
  WordList: { categoryId: string };
  WordDetail: { wordId: string; categoryId: string };
};

export type FlashcardStackParamList = {
  DeckSelect: undefined;
  FlashcardSession: { categoryId: string | 'favourites' | 'due' };
};
