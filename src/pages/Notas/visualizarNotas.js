import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { ipFacilAcesso } from '../config/config';

const VisualizarNotas = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/Notas/BuscarNotas`);
        const data = await response.json();
        setNotas(data);
      } catch (error) {
        console.error('Erro ao buscar notas:', error);
        Alert.alert('Erro', 'Erro ao buscar notas. Tente novamente mais tarde.');
      }
    };

    fetchNotas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>ID</Text>
            <Text style={styles.header}>Nome do Aluno</Text>
            <Text style={styles.header}>Nota</Text>
            <Text style={styles.header}>Data</Text>
          </View>
          {notas.map((nota) => (
            <View key={nota.idNota} style={styles.row}>
              <Text style={styles.cell}>{nota.idNota}</Text>
              <Text style={styles.cell}>{nota.nome_aluno}</Text>
              <Text style={styles.cell}>{nota.nota}</Text>
              <Text style={styles.cell}>{nota.dia_hoje}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262321',
    paddingTop: 50,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  table: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#A6121F',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#000',
  },
});

export default VisualizarNotas;
