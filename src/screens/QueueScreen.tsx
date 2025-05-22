import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import Password from '../components/Password';
import EmptyState from '../components/EmptyState';
import { useQueue } from '../contexts/QueueContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QueueScreen: React.FC = () => {
  const { queue, updateQueue, isQueueActive, startQueue, stopQueue } = useQueue();
  const [countdown, setCountdown] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPassword = queue.find(item => item.isCalled);
  const nextPasswords = queue.filter(item => !item.isCalled);

  useEffect(() => {
    // Limpa o timer anterior se existir
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isQueueActive && currentPassword) {
      setCountdown(10); // Sempre começa em 10 segundos para a senha atual
      
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === null || prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(null);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isQueueActive, currentPassword?.patient.password]); // Dependência apenas na senha atual

  const handlePasswordPress = (password: string) => {
    // Primeiro, vamos "deschamar" todas as senhas
    const updatedQueue = queue.map(item => ({
      ...item,
      isCalled: false
    }));

    // Agora vamos chamar a senha clicada
    const finalQueue = updatedQueue.map(item => 
      item.patient.password === password
        ? { ...item, isCalled: true }
        : item
    );

    // Atualizar a fila
    updateQueue(finalQueue);
  };

  if (queue.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="ticket-outline"
          message="A fila está vazia no momento."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Senha Atual</Text>
            {isQueueActive && countdown !== null && (
              <View style={styles.timerContainer}>
                <MaterialCommunityIcons 
                  name="clock-outline" 
                  size={16} 
                  color={theme.colors.subtext} 
                />
                <Text style={styles.timerText}>
                  Próxima senha em: {countdown}s
                </Text>
              </View>
            )}
          </View>
          {currentPassword ? (
            <Password
              password={currentPassword.patient.password}
              patientName={currentPassword.patient.name}
              priority={currentPassword.patient.priority}
              isCalled={true}
              roomNumber={currentPassword.patient.roomNumber}
            />
          ) : (
            <EmptyState
              icon="clock-outline"
              message="Nenhuma senha chamada no momento."
            />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Senhas</Text>
          </View>
          {nextPasswords.length > 0 ? (
            nextPasswords.map((item) => (
              <TouchableOpacity
                key={item.patient.password}
                onPress={() => handlePasswordPress(item.patient.password)}
              >
                <Password
                  password={item.patient.password}
                  patientName={item.patient.name}
                  priority={item.patient.priority}
                  isCalled={false}
                />
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState
              icon="check-circle-outline"
              message="Não há mais senhas na fila."
            />
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.floatingButton, isQueueActive ? styles.stopButton : styles.startButton]}
        onPress={isQueueActive ? stopQueue : startQueue}
      >
        <MaterialCommunityIcons
          name={isQueueActive ? "pause" : "play"}
          size={32}
          color={theme.colors.background}
        />
      </TouchableOpacity>
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerText: {
    fontSize: 12,
    color: theme.colors.subtext,
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
  },
  stopButton: {
    backgroundColor: theme.colors.error,
  },
});

export default QueueScreen; 