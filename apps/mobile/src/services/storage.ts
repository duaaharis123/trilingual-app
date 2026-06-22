import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@linguakids:';

export const Storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(PREFIX + key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(PREFIX + key);
  },

  async clear(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter(k => k.startsWith(PREFIX));
    await AsyncStorage.multiRemove(appKeys);
  },
};
