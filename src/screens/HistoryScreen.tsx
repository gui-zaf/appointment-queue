import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { theme } from '../../theme/theme';
import Password from '../components/Password';
import EmptyState from '../components/EmptyState';
import { useQueue } from '../contexts/QueueContext';

const HistoryScreen: React.FC = () => {
  const { history } = useQueue();

  if (history.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="history"
          message="Nenhuma senha atendida ainda."
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Senhas Atendidas</Text>
        </View>
        {history.map((item) => (
          <Password
            key={item.patient.password}
            password={item.patient.password}
            patientName={item.patient.name}
            priority={item.patient.priority}
            isCalled={true}
            roomNumber={item.patient.roomNumber}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});

export default HistoryScreen; 