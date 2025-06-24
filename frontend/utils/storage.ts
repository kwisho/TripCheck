import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = Platform.OS === 'web';

export const storage = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (isWeb) {
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`保存失敗: ${key}`, error);
      throw error;
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      if (isWeb) {
        return await AsyncStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`取得失敗: ${key}`, error);
      throw error;
    }
  },

  deleteItem: async (key: string): Promise<void> => {
    try {
      if (isWeb) {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`削除失敗: ${key}`, error);
      throw error;
    }
  },
};
