import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import PatientRegistration from './src/screens/PatientRegistration';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <PatientRegistration />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
