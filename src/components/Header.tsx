import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme/theme";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
});

export default Header;
