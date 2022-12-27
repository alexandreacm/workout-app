import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

async function setData(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e: any) {
    console.error(e.message);
  }
}

async function getData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.error(e.message);
  }

  return null;
}

async function containsKey(key: string) {
  try {
    const keys = await AsyncStorage.getAllKeys();

    return keys.includes(key);
  } catch (e: any) {
    console.error(e.message);
  }
}

async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.error(e.message);
  }
}

async function removeAllWorkouts() {
  try {
    let items: string[] = ["@app_workout", "@workout"];
    await AsyncStorage.multiRemove(items);
  } catch (e: any) {
    console.error(e.message);
  }
}

async function returnAllKeys() {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e: any) {
    console.error(e.message);
  }
}

export {
  getData,
  setData,
  containsKey,
  removeItem,
  removeAllWorkouts,
  returnAllKeys,
};
