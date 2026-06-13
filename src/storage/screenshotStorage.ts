import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenshotItem } from "@/types/screenshot";

const STORAGE_KEY = "screenshot-saver.items";

export async function getScreenshots(): Promise<ScreenshotItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  const items = JSON.parse(raw) as ScreenshotItem[];
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getScreenshot(id: string): Promise<ScreenshotItem | null> {
  const items = await getScreenshots();
  return items.find((item) => item.id === id) ?? null;
}

export async function saveScreenshot(item: ScreenshotItem): Promise<void> {
  const items = await getScreenshots();
  const nextItems = [item, ...items.filter((existing) => existing.id !== item.id)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
}
