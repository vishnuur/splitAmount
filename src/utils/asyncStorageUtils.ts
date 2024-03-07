import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

const setAsyncStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing token in AsyncStorage:', error);
  }
};

const getAsyncStorage = async (key: string) => {
  try {
    const storageValue = await AsyncStorage.getItem(key);
    return storageValue;
  } catch (error) {
    console.error('Error getting token in AsyncStorage:', error);
  }
};

export {clearAsyncStorage, setAsyncStorage, getAsyncStorage};
