import { I18nManager } from 'react-native';
import en from './en';
import ar from './ar';
import ur from './ur';
import type { UILanguage } from '../types';

const translations = { en, ar, ur };

type TranslationKeys = keyof typeof en;

export function t(lang: UILanguage, key: TranslationKeys, vars?: Record<string, string | number>): string {
  const dict = translations[lang] as Record<string, string>;
  let str = dict[key] ?? (translations.en as Record<string, string>)[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{{${k}}}`, String(v));
    });
  }
  return str;
}

export function isRTL(lang: UILanguage): boolean {
  return lang === 'ar' || lang === 'ur';
}

export function applyRTL(lang: UILanguage): void {
  const rtl = isRTL(lang);
  if (I18nManager.isRTL !== rtl) {
    I18nManager.allowRTL(rtl);
    I18nManager.forceRTL(rtl);
  }
}

export function fontForLang(lang: UILanguage): string | undefined {
  if (lang === 'ar') return 'Amiri';
  if (lang === 'ur') return 'NotoNastaliqUrdu';
  return undefined;
}
