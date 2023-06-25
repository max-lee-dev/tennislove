import MainContainer from './navigation/MainContainer'
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function App() {
  return (
    <MainContainer />
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
