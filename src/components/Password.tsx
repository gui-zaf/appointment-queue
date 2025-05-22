import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme/theme";

interface PasswordProps {
  password: string;
  patientName: string;
  priority: "normal" | "priority";
  isCalled?: boolean;
  roomNumber?: number;
  isHistory?: boolean;
}

const Password: React.FC<PasswordProps> = ({
  password,
  patientName,
  priority,
  isCalled = false,
  roomNumber,
  isHistory = false,
}) => {
  const getPriorityColor = () => {
    if (isHistory) return "#BBBBBB";
    // Vermelho para prioridade, verde para normal
    return priority === "priority" ? theme.colors.error : "#5AA47B";
  };

  const getPriorityBackground = () => {
    if (isHistory) return "#EDEDED";
    // Fundo vermelho claro para prioridade, verde claro para normal
    return priority === "priority" ? "#FFDADA" : "#D8FFEA";
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: getPriorityColor(),
          backgroundColor: getPriorityBackground(),
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={[styles.password, { color: getPriorityColor() }]}>
            {password}
          </Text>
          <Text style={[styles.patientName, { color: getPriorityColor() }]}>
            {patientName}
          </Text>
        </View>

        <View style={styles.rightSection}>
          {isCalled && roomNumber !== undefined && (
            <View style={styles.roomSection}>
              <MaterialCommunityIcons
                name="door"
                size={24}
                color={getPriorityColor()}
              />
              <Text style={[styles.roomNumber, { color: getPriorityColor() }]}>
                {roomNumber}
              </Text>
            </View>
          )}
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={getPriorityColor()}
            style={styles.chevron}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  password: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "500",
  },
  roomSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  roomNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chevron: {
    marginLeft: 8,
  },
});

export default Password;
