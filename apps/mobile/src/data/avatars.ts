import type { Avatar } from '../types';

export const AVATARS: Avatar[] = [
  { id: 'fox',     emoji: '🦊', label: { en: 'Foxy',   ar: 'فوكسي',  ur: 'فوکسی'  } },
  { id: 'bear',    emoji: '🐻', label: { en: 'Bruno',  ar: 'برونو',  ur: 'برونو'  } },
  { id: 'cat',     emoji: '🐱', label: { en: 'Mimi',   ar: 'ميمي',   ur: 'میمی'   } },
  { id: 'lion',    emoji: '🦁', label: { en: 'Leo',    ar: 'ليو',    ur: 'لیو'    } },
  { id: 'panda',   emoji: '🐼', label: { en: 'Panda',  ar: 'باندا',  ur: 'پانڈا'  } },
  { id: 'rabbit',  emoji: '🐰', label: { en: 'Bunny',  ar: 'باني',   ur: 'بنی'    } },
  { id: 'owl',     emoji: '🦉', label: { en: 'Ollie',  ar: 'أولي',   ur: 'اولی'   } },
  { id: 'frog',    emoji: '🐸', label: { en: 'Froggy', ar: 'فروغي',  ur: 'فروگی'  } },
];

export const MASCOT = AVATARS.find(a => a.id === 'owl')!;
