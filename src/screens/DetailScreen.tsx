import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { getScreenshot } from "@/storage/screenshotStorage";
import { ScreenshotItem } from "@/types/screenshot";
import { formatSavedDate } from "@/utils/dates";

export function DetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [item, setItem] = useState<ScreenshotItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) {
        setError("Screenshot was not found.");
        setIsLoading(false);
        return;
      }

      try {
        const screenshot = await getScreenshot(id);
        if (!screenshot) {
          setError("Screenshot was not found.");
        }
        setItem(screenshot);
      } catch {
        setError("Could not load this screenshot.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (error || !item) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.error}>{error ?? "Screenshot was not found."}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: item.imageUri }} style={styles.image} />

        <View style={styles.block}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{item.title}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Summary</Text>
          <Text style={styles.value}>{item.summary}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Suggested action</Text>
          <Text style={styles.value}>{item.action}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{item.category}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Date saved</Text>
          <Text style={styles.value}>{formatSavedDate(item.createdAt)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f9fafb",
    flex: 1
  },
  centered: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  container: {
    gap: 18,
    padding: 24
  },
  image: {
    alignSelf: "center",
    aspectRatio: 9 / 16,
    backgroundColor: "#eef2f7",
    borderRadius: 8,
    width: "82%"
  },
  block: {
    gap: 6
  },
  label: {
    color: "#4b5563",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  value: {
    color: "#111827",
    fontSize: 17,
    lineHeight: 24
  },
  error: {
    color: "#b91c1c",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center"
  }
});
