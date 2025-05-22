import React, { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme/theme";
import ReviewPatientModal from "../components/ReviewPatientModal";
import PasswordModal from "../components/PasswordModal";
import { useNavigation } from "../contexts/NavigationContext";

interface Patient {
  name: string;
  age: number;
  password: string;
  specialty: string;
  priority: "normal" | "priority";
  roomNumber: number;
}

type Tab = "register" | "queue" | "history";

const PatientRegistration = () => {
  const { changeTab } = useNavigation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [storedPriority, setStoredPriority] = useState<"Prioridade" | "Comum">(
    "Comum"
  );
  const [storedPatient, setStoredPatient] = useState<Patient | null>(null);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const nameInputRef = useRef<TextInput>(null);
  const ageInputRef = useRef<TextInput>(null);
  const genderInputRef = useRef<TextInput>(null);

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
    return !isNaN(age) && age >= 0 && age <= 120;
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

  const getGenderFull = (g: string) => {
    if (g === "M") return "Masculino";
    if (g === "F") return "Feminino";
    return "Outro";
  };

  const getSpecialty = (ageStr: string) => {
    const age = parseInt(ageStr);
    if (isNaN(age)) return "-";
    if (age <= 12) return "Pediatria ou Neuropediatria";
    if (age <= 18)
      return "Endocrinologia Pediátrica ou Psiquiatria Infantil e Adolescente";
    if (age <= 40) return "Dermatologia ou Ginecologia/Urologia";
    if (age <= 60) return "Cardiologia ou Ortopedia";
    return "Geriatria ou Oftalmologia";
  };

  const getPriority = (ageStr: string) => {
    const age = parseInt(ageStr);
    if (isNaN(age)) return null;
    if (age >= 60 || age <= 2) return "Prioridade";
    return "Comum";
  };

  const handleAgeChange = (text: string) => {
    const formattedAge = formatAge(text);
    setAge(formattedAge);
    setAgeError(formattedAge !== "" && !isValidAge(formattedAge));
  };

  const handleNameChange = (text: string) => {
    const formattedName = formatName(text);
    setName(formattedName);
    setNameError(formattedName !== "" && !isValidName(formattedName));
  };

  const handleGenderChange = (text: string) => {
    const upperText = text.toUpperCase();
    setGender(upperText);
    setGenderError(upperText !== "" && !isValidGender(upperText));
  };

  const handleConfirmReview = () => {
    // Dismiss keyboard
    Keyboard.dismiss();

    // Create patient object
    const priority = getPriority(age) || "Comum";
    const prefix = priority === "Prioridade" ? "P" : "C";
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const generatedPass = `${prefix}${randomNum}`;
    const roomNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10

    const patient: Patient = {
      name,
      age: parseInt(age),
      password: generatedPass,
      specialty: getSpecialty(age),
      priority: priority === "Prioridade" ? "priority" : "normal",
      roomNumber,
    };

    // Store patient data
    setStoredPatient(patient);

    // Blur all inputs
    nameInputRef.current?.blur();
    ageInputRef.current?.blur();
    genderInputRef.current?.blur();

    // Clear all inputs
    setName("");
    setAge("");
    setGender("");

    // Reset errors
    setNameError(false);
    setAgeError(false);
    setGenderError(false);

    setReviewModalVisible(false);
    setPasswordModalVisible(true);
  };

  const handleViewQueue = () => {
    Keyboard.dismiss();
    setPasswordModalVisible(false);
    changeTab("queue");
  };

  const handleOpenReviewModal = () => {
    // Blur all inputs to remove focus
    nameInputRef.current?.blur();
    ageInputRef.current?.blur();
    genderInputRef.current?.blur();

    // Dismiss keyboard
    Keyboard.dismiss();

    setReviewModalVisible(true);
  };

  const handleNameSubmit = () => {
    ageInputRef.current?.focus();
  };

  const handleAgeSubmit = () => {
    genderInputRef.current?.focus();
  };

  const handleGenderSubmit = () => {
    if (isFormValid) {
      setReviewModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.fixGap}>
          <Text style={styles.label}>Nome completo:</Text>
          <View style={[styles.inputContainer, nameError && styles.inputError]}>
            <Ionicons
              name="person-outline"
              size={24}
              color={nameError ? theme.colors.error : theme.colors.icon.active}
            />
            <TextInput
              ref={nameInputRef}
              style={styles.input}
              value={name}
              onChangeText={handleNameChange}
              placeholder="Digite o nome completo"
              placeholderTextColor={theme.colors.subtext}
              maxLength={100}
              returnKeyType="next"
              onSubmitEditing={handleNameSubmit}
              blurOnSubmit={false}
            />
          </View>
          {nameError && (
            <Text style={styles.errorText}>
              Digite um nome válido (mínimo 3 caracteres)
            </Text>
          )}
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.label}>Idade:</Text>
            <View
              style={[styles.inputContainer, ageError && styles.inputError]}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={ageError ? theme.colors.error : theme.colors.icon.active}
              />
              <TextInput
                ref={ageInputRef}
                style={styles.input}
                value={age}
                onChangeText={handleAgeChange}
                placeholder="Digite a idade"
                placeholderTextColor={theme.colors.subtext}
                keyboardType="numeric"
                maxLength={3}
                returnKeyType="next"
                onSubmitEditing={handleAgeSubmit}
                blurOnSubmit={false}
              />
            </View>
            {ageError && (
              <Text style={styles.errorText}>
                Digite uma idade válida (0-120)
              </Text>
            )}
          </View>

          <View style={styles.columnContainer}>
            <Text style={styles.label}>Sexo:</Text>
            <View
              style={[styles.inputContainer, genderError && styles.inputError]}
            >
              <Ionicons
                name="male-female-outline"
                size={24}
                color={
                  genderError ? theme.colors.error : theme.colors.icon.active
                }
              />
              <TextInput
                ref={genderInputRef}
                style={styles.input}
                value={gender}
                onChangeText={handleGenderChange}
                placeholder="M, F ou O"
                placeholderTextColor={theme.colors.subtext}
                maxLength={1}
                returnKeyType="done"
                onSubmitEditing={handleGenderSubmit}
              />
            </View>
            {genderError && (
              <Text style={styles.errorText}>Digite M, F ou O</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          disabled={!isFormValid}
          onPress={handleOpenReviewModal}
        >
          <Text style={styles.buttonText}>Continuar</Text>
          <Ionicons
            name="arrow-forward"
            size={24}
            color={theme.colors.background}
          />
        </TouchableOpacity>
      </View>

      <ReviewPatientModal
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        onConfirm={handleConfirmReview}
        name={name}
        age={age}
        gender={gender}
        specialty={getSpecialty(age)}
        priority={getPriority(age)}
      />

      {storedPatient && (
        <PasswordModal
          visible={passwordModalVisible}
          onClose={() => {
            setPasswordModalVisible(false);
            setStoredPatient(null);
          }}
          patient={storedPatient}
          onViewQueue={handleViewQueue}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  formContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  fixGap: {
    gap: 2,
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
  inputError: {
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 10,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default PatientRegistration;
