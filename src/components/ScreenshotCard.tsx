import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScreenshotItem } from "@/types/screenshot";

type ScreenshotCardProps = {
  item: ScreenshotItem;
  onPress: () => void;
};

export function ScreenshotCard({ item, onPress }: ScreenshotCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text numberOfLines={2} style={styles.action}>
          {item.action}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 12
  },
  thumbnail: {
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    height: 74,
    width: 74
  },
  content: {
    flex: 1,
    gap: 4
  },
  title: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  },
  category: {
    color: "#4b5563",
    fontSize: 13,
    fontWeight: "600"
  },
  action: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 20
  }
});
