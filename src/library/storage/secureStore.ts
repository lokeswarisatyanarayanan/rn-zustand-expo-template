import * as SecureStore from "expo-secure-store";

const PREFIX = "APP__";

const withPrefix = (key: string) => `${PREFIX}${key}`;

export async function saveItem<T>(key: string, value: T): Promise<void> {
  try {
    const stringValue = JSON.stringify(value);
    await SecureStore.setItemAsync(withPrefix(key), stringValue);
  } catch (error) {
    console.error(`SecureStore save error for key: ${key}`, error);
    throw error;
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await SecureStore.getItemAsync(withPrefix(key));
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`SecureStore get error for key: ${key}`, error);
    return null;
  }
}

export async function deleteItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(withPrefix(key));
  } catch (error) {
    console.error(`SecureStore delete error for key: ${key}`, error);
    throw error;
  }
}
