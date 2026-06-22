import type { Category } from '../types';
import { Colors } from '../theme';

export const CATEGORIES: Category[] = [
  { id: 'animals',  emoji: '🐾', color: Colors.cat.animals,  label: { en: 'Animals',  ar: 'حيوانات', ur: 'جانور'      } },
  { id: 'colors',   emoji: '🎨', color: Colors.cat.colors,   label: { en: 'Colors',   ar: 'ألوان',   ur: 'رنگ'        } },
  { id: 'numbers',  emoji: '🔢', color: Colors.cat.numbers,  label: { en: 'Numbers',  ar: 'أرقام',   ur: 'گنتی'       } },
  { id: 'food',     emoji: '🍎', color: Colors.cat.food,     label: { en: 'Food',     ar: 'طعام',    ur: 'کھانا'      } },
  { id: 'family',   emoji: '👨‍👩‍👧', color: Colors.cat.family,   label: { en: 'Family',   ar: 'عائلة',   ur: 'خاندان'    } },
  { id: 'body',     emoji: '👁️',  color: Colors.cat.body,     label: { en: 'Body',     ar: 'جسم',     ur: 'جسم'        } },
  { id: 'nature',   emoji: '🌿', color: Colors.cat.nature,   label: { en: 'Nature',   ar: 'طبيعة',   ur: 'فطرت'       } },
  { id: 'clothes',  emoji: '👕', color: Colors.cat.clothes,  label: { en: 'Clothes',  ar: 'ملابس',   ur: 'لباس'       } },
  { id: 'home',     emoji: '🏠', color: Colors.cat.home,     label: { en: 'Home',     ar: 'منزل',    ur: 'گھر'        } },
  { id: 'vehicles', emoji: '🚗', color: Colors.cat.vehicles, label: { en: 'Vehicles', ar: 'مركبات',  ur: 'گاڑیاں'    } },
  { id: 'emotions', emoji: '😊', color: Colors.cat.emotions, label: { en: 'Emotions', ar: 'مشاعر',   ur: 'جذبات'      } },
  { id: 'shapes',   emoji: '🔷', color: Colors.cat.shapes,   label: { en: 'Shapes',   ar: 'أشكال',   ur: 'اشکال'      } },
];
