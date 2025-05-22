import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import EmptyState from '../components/EmptyState';

const HistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState
        icon="history"
        message="Aqui você encontrará as senhas que já foram chamadas."
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

export default HistoryScreen; 