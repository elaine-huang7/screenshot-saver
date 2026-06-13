import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScreenshotCard } from "@/components/ScreenshotCard";
import { useScreenshots } from "@/hooks/useScreenshots";

export function LibraryScreen() {
  const { items, isLoading, error, loadScreenshots } = useScreenshots();

  useFocusEffect(
    useCallback(() => {
      loadScreenshots();
    }, [loadScreenshots])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Library</Text>
        <ErrorMessage message={error} />

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            contentContainerStyle={items.length === 0 ? styles.emptyList : styles.list}
            data={items}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No saved screenshots yet.</Text>
                <PrimaryButton label="Upload Screenshot" onPress={() => router.push("/")} />
              </View>
            }
            renderItem={({ item }) => (
              <ScreenshotCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: "/screenshot/[id]",
                    params: { id: item.id }
                  })
                }
              />
            )}
          />
        )}
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
    padding: 20
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 16
  },
  list: {
    gap: 12,
    paddingBottom: 20
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center"
  },
  empty: {
    gap: 16
  },
  emptyText: {
    color: "#4b5563",
    fontSize: 16,
    textAlign: "center"
  }
});
