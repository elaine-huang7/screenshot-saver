import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { aiService } from "@/services/aiService";
import { logger } from "@/utils/logger";

export function ProcessingScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function analyze() {
      if (!imageUri) {
        setError("No screenshot was selected.");
        return;
      }

      try {
        const analysis = await aiService.analyzeScreenshot({ imageUri });
        logger.analysisCompleted();
        router.replace({
          pathname: "/results",
          params: {
            imageUri,
            title: analysis.title,
            summary: analysis.summary,
            action: analysis.action,
            category: analysis.category
          }
        });
      } catch (analysisError) {
        logger.analysisError(analysisError);
        setError("Could not analyze this screenshot. Please try again.");
      }
    }

    analyze();
  }, [imageUri]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}

        <View style={styles.status}>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <>
              <ActivityIndicator />
              <Text style={styles.message}>Analyzing screenshot...</Text>
            </>
          )}
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
    gap: 24,
    justifyContent: "center",
    padding: 24
  },
  preview: {
    alignSelf: "center",
    aspectRatio: 9 / 16,
    backgroundColor: "#eef2f7",
    borderRadius: 8,
    maxHeight: 440,
    width: "80%"
  },
  status: {
    alignItems: "center",
    gap: 12
  },
  message: {
    color: "#374151",
    fontSize: 16
  },
  error: {
    color: "#b91c1c",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center"
  }
});
