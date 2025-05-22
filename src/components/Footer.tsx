import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

type FooterItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const FooterItem = ({ icon, activeIcon, label, isActive, onPress }: FooterItemProps) => {
  return (
    <TouchableOpacity style={styles.footerItem} onPress={onPress}>
      <Ionicons
        name={isActive ? activeIcon : icon}
        size={24}
        color={isActive ? theme.colors.primary : theme.colors.text}
      />
      <Text style={[
        styles.footerText,
        { color: isActive ? theme.colors.primary : theme.colors.text }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

type FooterProps = {
  activeTab: 'register' | 'queue' | 'history';
  onTabChange: (tab: 'register' | 'queue' | 'history') => void;
};

const Footer = ({ activeTab, onTabChange }: FooterProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FooterItem
          icon="person-add-outline"
          activeIcon="person-add"
          label="Cadastro"
          isActive={activeTab === 'register'}
          onPress={() => onTabChange('register')}
        />
        <FooterItem
          icon="list-outline"
          activeIcon="list"
          label="Fila"
          isActive={activeTab === 'queue'}
          onPress={() => onTabChange('queue')}
        />
        <FooterItem
          icon="time-outline"
          activeIcon="time"
          label="Histórico"
          isActive={activeTab === 'history'}
          onPress={() => onTabChange('history')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 60,
  },
  footerItem: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Footer; 