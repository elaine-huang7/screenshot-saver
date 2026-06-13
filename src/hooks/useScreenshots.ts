import { useCallback, useState } from "react";
import { getScreenshots } from "@/storage/screenshotStorage";
import { ScreenshotItem } from "@/types/screenshot";

export function useScreenshots() {
  const [items, setItems] = useState<ScreenshotItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadScreenshots = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setItems(await getScreenshots());
    } catch {
      setError("Could not load saved screenshots.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    items,
    isLoading,
    error,
    loadScreenshots
  };
}
