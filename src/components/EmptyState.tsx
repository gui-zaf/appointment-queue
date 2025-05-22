import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme/theme";

interface EmptyStateProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={80}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    opacity: 0.5,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: "center",
    opacity: 0.5,
  },
});

export default EmptyState;
