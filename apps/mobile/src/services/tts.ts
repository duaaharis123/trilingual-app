import Tts from 'react-native-tts';
import type { ContentLanguage } from '../types';

const LANG_CODE: Record<ContentLanguage, string> = {
  en: 'en-US',
  ar: 'ar-SA',
  ur: 'ur-PK',
};

let initialized = false;

async function init() {
  if (initialized) return;
  await Tts.setDefaultRate(0.45); // slightly slower for children
  await Tts.setDefaultPitch(1.1);
  initialized = true;
}

export const TTSService = {
  async speak(text: string, lang: ContentLanguage): Promise<void> {
    await init();
    Tts.stop();
    await Tts.setDefaultLanguage(LANG_CODE[lang]);
    Tts.speak(text);
  },

  stop(): void {
    Tts.stop();
  },
};
