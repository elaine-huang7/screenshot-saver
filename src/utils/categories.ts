import { ScreenshotCategory } from "@/types/screenshot";

export const SCREENSHOT_CATEGORIES: ScreenshotCategory[] = [
  "Event",
  "Shopping",
  "Travel",
  "Food",
  "School",
  "Work",
  "Entertainment",
  "Other"
];

export function isScreenshotCategory(value: string): value is ScreenshotCategory {
  return SCREENSHOT_CATEGORIES.includes(value as ScreenshotCategory);
}
