import { router, useLocalSearchParams } from "expo-router";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PrimaryButton } from "@/components/PrimaryButton";
import { saveScreenshot } from "@/storage/screenshotStorage";
import { ScreenshotCategory, ScreenshotItem } from "@/types/screenshot";
import { createId } from "@/utils/ids";
import { logger } from "@/utils/logger";
import { isScreenshotCategory } from "@/utils/categories";
import { useState } from "react";

export function ResultsScreen() {
  const params = useLocalSearchParams<{
    imageUri?: string;
    title?: string;
    summary?: string;
    action?: string;
    category?: string;
  }>();
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const rawCategory = typeof params.category === "string" ? params.category : "";
  const category: ScreenshotCategory = isScreenshotCategory(rawCategory)
    ? rawCategory
    : "Other";

  async function handleSave() {
    if (!params.imageUri || !params.title || !params.summary || !params.action) {
      setError("Analysis result is incomplete.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const item: ScreenshotItem = {
        id: createId(),
        imageUri: params.imageUri,
        title: params.title,
        summary: params.summary,
        action: params.action,
        category,
        status: "active",
        createdAt: new Date().toISOString()
      };

      await saveScreenshot(item);
      logger.saveCompleted(item.id);
      router.replace("/library");
    } catch {
      setError("Could not save this screenshot.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {params.imageUri ? (
          <Image source={{ uri: params.imageUri }} style={styles.preview} />
        ) : null}

        <View style={styles.resultBlock}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{params.title}</Text>
        </View>
        <View style={styles.resultBlock}>
          <Text style={styles.label}>Summary</Text>
          <Text style={styles.value}>{params.summary}</Text>
        </View>
        <View style={styles.resultBlock}>
          <Text style={styles.label}>Suggested action</Text>
          <Text style={styles.value}>{params.action}</Text>
        </View>
        <View style={styles.resultBlock}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{category}</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton label="Save" onPress={handleSave} disabled={isSaving} />
          <PrimaryButton
            label="Discard"
            onPress={() => router.replace("/")}
            variant="secondary"
            disabled={isSaving}
          />
          <ErrorMessage message={error} />
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
  container: {
    gap: 18,
    padding: 24
  },
  preview: {
    alignSelf: "center",
    aspectRatio: 9 / 16,
    backgroundColor: "#eef2f7",
    borderRadius: 8,
    maxHeight: 360,
    width: "70%"
  },
  resultBlock: {
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
  actions: {
    gap: 12,
    marginTop: 8
  }
});
