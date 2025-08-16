import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  async setItem<T>(key: string, value: T) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      if (__DEV__) console.error('AsyncStorage setItem error:', e);
    }
  }

  async getItem<T>(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (e) {
      if (__DEV__) console.error('AsyncStorage getItem error:', e);
      return null;
    }
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      if (__DEV__) console.error('AsyncStorage removeItem error:', e);
    }
  }

  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      if (__DEV__) console.error('AsyncStorage clearAll error:', e);
    }
  }
}

export default new AsyncStorageService();
