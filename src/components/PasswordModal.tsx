import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
  password: string;
  priority: string | null;
  onViewQueue: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  visible,
  onClose,
  password,
  priority,
  onViewQueue,
}) => {
  const now = new Date();
  const formattedDateTime = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.modalContainer} pointerEvents="box-none">
          <View style={styles.modalTitleRow}>
            <Text style={styles.modalTitle}>Senha do Paciente</Text>
          </View>
          <View style={styles.modalDivider} />
          
          <View style={[
            styles.passwordContainer,
            priority === 'Prioridade' ? styles.pillPriority : styles.pillCommon
          ]}>
            <Ionicons 
              name="key-outline" 
              size={24} 
              color={priority === 'Prioridade' ? '#FD4E4E' : '#5AA47B'} 
              style={styles.passwordIcon}
            />
            <Text style={[
              styles.passwordText,
              priority === 'Prioridade' ? styles.pillPriorityText : styles.pillCommonText
            ]}>
              {password}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={24} color={theme.colors.icon.active} />
            <Text style={styles.infoText}>
              Os pacientes são atendidos por ordem de prioridade, não por ordem de chegada.
            </Text>
          </View>

          <Text style={styles.dateText}>Senha gerada em: {formattedDateTime}</Text>

          <TouchableOpacity style={styles.modalButton} onPress={onViewQueue}>
            <View style={styles.modalButtonContent}>
              <Text style={styles.modalButtonText}>Ver fila</Text>
              <Ionicons name="list" size={22} color={theme.colors.background} />
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalDivider: {
    height: 1,
    backgroundColor: theme.colors.surface,
    width: '100%',
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    position: 'relative',
  },
  passwordIcon: {
    position: 'absolute',
    left: 16,
  },
  passwordText: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.subtext,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 12,
    color: theme.colors.text,
    flex: 1,
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    width: '100%',
  },
  modalButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pillPriority: {
    borderWidth: 1,
    borderColor: '#FD4E4E',
    backgroundColor: '#FFDADA',
  },
  pillPriorityText: {
    color: '#FD4E4E',
  },
  pillCommon: {
    borderWidth: 1,
    borderColor: '#5AA47B',
    backgroundColor: '#D8FFEA',
  },
  pillCommonText: {
    color: '#5AA47B',
  },
});

export default PasswordModal; 