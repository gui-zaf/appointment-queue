import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme/theme";

interface ReviewPatientModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  age: string;
  gender: string;
  specialty: string;
  priority: string | null;
  onConfirm: () => void;
}

const getGenderFull = (g: string) => {
  if (g === "M") return "Masculino";
  if (g === "F") return "Feminino";
  return "Outro";
};

const ReviewPatientModal: React.FC<ReviewPatientModalProps> = ({
  visible,
  onClose,
  name,
  age,
  gender,
  specialty,
  priority,
  onConfirm,
}) => {
  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  const handleConfirm = () => {
    Keyboard.dismiss();
    onConfirm();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={handleClose}
      >
        <View style={styles.modalContainer} pointerEvents="box-none">
          <View style={styles.modalTitleRow}>
            <Text style={styles.modalTitle}>Revisar Informações</Text>
          </View>
          <View style={styles.modalDivider} />
          {priority && (
            <View
              style={
                priority === "Prioridade"
                  ? styles.pillPriority
                  : styles.pillCommon
              }
            >
              <Text
                style={
                  priority === "Prioridade"
                    ? styles.pillPriorityText
                    : styles.pillCommonText
                }
              >
                {priority}
              </Text>
            </View>
          )}
          <View style={styles.modalInfoRow}>
            <Ionicons
              name="person-outline"
              size={24}
              color={theme.colors.icon.active}
            />
            <Text style={styles.modalInfoText}>{name}</Text>
          </View>
          <View style={styles.modalInfoRow}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={theme.colors.icon.active}
            />
            <Text style={styles.modalInfoText}>{age} anos</Text>
          </View>
          <View style={styles.modalInfoRow}>
            <Ionicons
              name="male-female-outline"
              size={24}
              color={theme.colors.icon.active}
            />
            <Text style={styles.modalInfoText}>{getGenderFull(gender)}</Text>
          </View>
          <View style={styles.modalInfoRow}>
            <Ionicons
              name="medkit-outline"
              size={24}
              color={theme.colors.icon.active}
            />
            <Text style={styles.modalInfoText}>{specialty}</Text>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
            <View style={styles.modalButtonContent}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
              <Ionicons
                name="checkmark"
                size={22}
                color={theme.colors.background}
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    marginBottom: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
  },
  modalDivider: {
    height: 1,
    backgroundColor: theme.colors.surface,
    width: "100%",
    marginBottom: 16,
  },
  pillPriority: {
    borderWidth: 1,
    borderColor: "#FD4E4E",
    backgroundColor: "#FFDADA",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  pillPriorityText: {
    color: "#FD4E4E",
    fontWeight: "bold",
    fontSize: 14,
  },
  pillCommon: {
    borderWidth: 1,
    borderColor: "#5AA47B",
    backgroundColor: "#D8FFEA",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  pillCommonText: {
    color: "#5AA47B",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
    justifyContent: "flex-start",
  },
  modalInfoText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
    textAlign: "left",
    flexShrink: 1,
    flexWrap: "wrap",
    minWidth: 0,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "stretch",
    width: "100%",
  },
  modalButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewPatientModal;
