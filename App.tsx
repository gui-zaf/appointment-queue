// Funcionalidades do app:
// 1 - Adicione usuários preenchendo corretamente os campos. Se houver erro, uma mensagem será exibida.
// 2 - Na tela "Fila", clique no ícone de globo para carregar dados de exemplo. Use o botão play/pause para iniciar ou pausar a fila.
// 3 - Também na "Fila", clique em um paciente para adiantar sua chamada na ordem.
// 4 - Acompanhe as senhas chamadas na tela "Histórico".
// Obs: Tomei a liberdade de definir como prioritário crianças de até 1 ano de idade, adequando a proposta do app à Lei 10.048/2000 sobre atendimento prioritário.
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import PatientRegistration from "./src/screens/PatientRegistration";
import QueueScreen from "./src/screens/QueueScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import { theme } from "./theme/theme";
import {
  NavigationProvider,
  useNavigation,
} from "./src/contexts/NavigationContext";
import { QueueProvider } from "./src/contexts/QueueContext";

const AppContent = () => {
  const { activeTab, changeTab } = useNavigation();
  const insets = useSafeAreaInsets();

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "register":
        return "Cadastro de Paciente";
      case "queue":
        return "Fila";
      case "history":
        return "Histórico";
      default:
        return "Cadastro de Paciente";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "register":
        return <PatientRegistration />;
      case "queue":
        return <QueueScreen />;
      case "history":
        return <HistoryScreen />;
      default:
        return <PatientRegistration />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" />
      <Header title={getHeaderTitle()} />
      <View style={styles.content}>{renderContent()}</View>
      <Footer activeTab={activeTab} onTabChange={changeTab} />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <QueueProvider>
          <AppContent />
        </QueueProvider>
      </NavigationProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
});
