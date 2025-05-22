import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import EmptyState from '../components/EmptyState';

const QueueScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState
        icon="ticket-outline"
        message="Ainda não há senhas na fila. Adicione um paciente na seção de cadastro."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default QueueScreen; 