import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PrimaryButton } from "@/components/PrimaryButton";
import { pickScreenshotFromLibrary } from "@/services/imagePickerService";
import { logger } from "@/utils/logger";

export function HomeScreen() {
  const [error, setError] = useState<string | null>(null);

  async function handleUpload() {
    setError(null);

    try {
      logger.uploadStarted();
      const image = await pickScreenshotFromLibrary();

      if (!image) {
        return;
      }

      router.push({
        pathname: "/processing",
        params: { imageUri: image.uri }
      });
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload screenshot."
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Screenshot Saver</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton label="Upload Screenshot" onPress={handleUpload} />
          <PrimaryButton
            label="View Library"
            onPress={() => router.push("/library")}
            variant="secondary"
          />
          <ErrorMessage message={error} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f9fafb",
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  header: {
    marginBottom: 40
  },
  title: {
    color: "#111827",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0,
    textAlign: "center"
  },
  actions: {
    gap: 14
  }
});
