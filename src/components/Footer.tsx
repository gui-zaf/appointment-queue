import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FooterItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const FooterItem = ({ icon, activeIcon, label, isActive, onPress }: FooterItemProps) => {
  return (
    <TouchableOpacity
      style={styles.footerItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isActive ? activeIcon : icon}
        size={24}
        color={isActive ? theme.colors.primary : theme.colors.subtext}
      />
      <Text
        style={[
          styles.footerItemText,
          { color: isActive ? theme.colors.primary : theme.colors.subtext },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface FooterProps {
  activeTab: "register" | "queue" | "history";
  onTabChange: (tab: "register" | "queue" | "history") => void;
}

const Footer = ({ activeTab, onTabChange }: FooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
      <FooterItem
        icon="person-outline"
        activeIcon="person"
        label="Cadastro"
        isActive={activeTab === "register"}
        onPress={() => onTabChange("register")}
      />
      <FooterItem
        icon="list-outline"
        activeIcon="list"
        label="Fila"
        isActive={activeTab === "queue"}
        onPress={() => onTabChange("queue")}
      />
      <FooterItem
        icon="time-outline"
        activeIcon="time"
        label="Histórico"
        isActive={activeTab === "history"}
        onPress={() => onTabChange("history")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
    paddingTop: 8,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  footerItemText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Footer;
