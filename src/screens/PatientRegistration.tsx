import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme/theme";
import Footer from "../components/Footer";

const PatientRegistration = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const formatName = (text: string) => {
    const cleanedText = text.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    return cleanedText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatAge = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, "");
    if (numbersOnly.length > 3) return numbersOnly.slice(0, 3);
    return numbersOnly;
  };

  const isValidAge = (ageStr: string) => {
    const age = parseInt(ageStr);
    return !isNaN(age) && age > 0 && age <= 120;
  };

  const isValidName = (nameStr: string) => {
    return nameStr.trim().length >= 3;
  };

  const isValidGender = (genderStr: string) => {
    return ["M", "F", "O"].includes(genderStr);
  };

  const isFormValid = useMemo(() => {
    return isValidName(name) && isValidAge(age) && isValidGender(gender);
  }, [name, age, gender]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cadastro de Paciente</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.fixGap}>
            <Text style={styles.label}>Nome completo:</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color={theme.colors.icon.active}
              />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(formatName(text))}
                placeholder="Digite o nome completo"
                placeholderTextColor={theme.colors.subtext}
                maxLength={100}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.label}>Idade:</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={theme.colors.icon.active}
                />
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={(text) => setAge(formatAge(text))}
                  placeholder="Digite a idade"
                  placeholderTextColor={theme.colors.subtext}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            <View style={styles.columnContainer}>
              <Text style={styles.label}>Sexo:</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="male-female-outline"
                  size={24}
                  color={theme.colors.icon.active}
                />
                <TextInput
                  style={styles.input}
                  value={gender}
                  onChangeText={(text) => setGender(text.toUpperCase())}
                  placeholder="M, F ou O"
                  placeholderTextColor={theme.colors.subtext}
                  maxLength={1}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Continuar</Text>
            <Ionicons
              name="arrow-forward"
              size={24}
              color={theme.colors.background}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
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
  fixGap: {
    gap: 2,
  },
  formContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
  },
  columnContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.icon.disabled,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PatientRegistration;
