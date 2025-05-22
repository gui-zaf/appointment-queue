import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import PatientRegistration from './src/screens/PatientRegistration';
import QueueScreen from './src/screens/QueueScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import { theme } from './theme/theme';
import { NavigationProvider, useNavigation } from './src/contexts/NavigationContext';

const AppContent = () => {
  const { activeTab, changeTab } = useNavigation();

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'register':
        return 'Cadastro de Paciente';
      case 'queue':
        return 'Fila';
      case 'history':
        return 'Histórico';
      default:
        return 'Cadastro de Paciente';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'register':
        return <PatientRegistration />;
      case 'queue':
        return <QueueScreen />;
      case 'history':
        return <HistoryScreen />;
      default:
        return <PatientRegistration />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title={getHeaderTitle()} />
      <View style={styles.content}>
        {renderContent()}
      </View>
      <Footer activeTab={activeTab} onTabChange={changeTab} />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
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
