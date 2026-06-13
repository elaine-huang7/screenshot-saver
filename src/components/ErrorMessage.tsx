import { StyleSheet, Text } from "react-native";

type ErrorMessageProps = {
  message: string | null;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return <Text style={styles.message}>{message}</Text>;
}

const styles = StyleSheet.create({
  message: {
    color: "#b91c1c",
    fontSize: 14,
    lineHeight: 20
  }
});
