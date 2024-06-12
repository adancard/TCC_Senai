import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ipFacilAcesso } from '../config/config';

const VerificarNotas = () => {
  const [alunos, setAlunos] = useState([]);
  const [contadorCriticas, setContadorCriticas] = useState({});
  const [contadorDesejados, setContadorDesejados] = useState({});
  const [nota, setNota] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunosResponse = await fetch(`http://${ipFacilAcesso}:8080/alunos/TodosAlunos`);
        const alunosData = await alunosResponse.json();
        setAlunos(alunosData);
        setNota(Array(alunosData.length).fill(''));

        const criteriosCriticosResponse = await fetch(`http://${ipFacilAcesso}:8080/alunos/criterios-criticos-atingidos`);
        const criteriosCriticosData = await criteriosCriticosResponse.json();

        const criticasMap = {};
        criteriosCriticosData.forEach(item => {
          const [nome_aluno, criterios_criticos_atingidos] = item;
          criticasMap[nome_aluno] = criterios_criticos_atingidos;
        });
        setContadorCriticas(criticasMap);

        const criteriosDesejadosResponse = await fetch(`http://${ipFacilAcesso}:8080/alunos/criterios-desejados-atingidos`);
        const criteriosDesejadosData = await criteriosDesejadosResponse.json();

        const desejadosMap = {};
        criteriosDesejadosData.forEach(item => {
          const [nome_aluno, criterios_desejados_atingidos] = item;
          desejadosMap[nome_aluno] = criterios_desejados_atingidos;
        });
        setContadorDesejados(desejadosMap);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleNotaChange = (text, index) => {
    setNota((prevNota) => {
      const updatedNota = [...prevNota];
      updatedNota[index] = text;
      return updatedNota;
    });
  };


  const formatarDataBrasileira = (date) => {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); 
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
  
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }

  const currentDate = formatarDataBrasileira(new Date());

  const onPressConfirmarNotas = async () => {
    const notasEnviar = alunos.map((aluno, index) => ({
      nome_aluno: aluno.nome,
      dia_hoje: currentDate,
      nota: nota[index] ? parseInt(nota[index], 10) : null,
      
    })).filter(item => item.nota !== null);

    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Notas/CriarNotas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notasEnviar),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Notas enviadas com sucesso.');
      } else {
        Alert.alert('Erro', `Erro ao enviar notas: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Erro', `Erro ao enviar notas: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titulo}>Verificar Notas</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Alunos</Text>
            <Text style={styles.header}>Crítica</Text>
            <Text style={styles.header}>Desejável</Text>
            <Text style={styles.header}>Nota</Text>
          </View>
          {alunos.map((aluno, index) => (
            <View key={aluno.num_matricula_aluno} style={styles.row}>
              <Text style={styles.cellText}>{aluno.nome}</Text>
              <Text style={styles.cellText}>{contadorCriticas[aluno.nome] || 0}</Text>
              <Text style={styles.cellText}>{contadorDesejados[aluno.nome] || 0}</Text>
              <TextInput
                style={styles.inputText}
                value={nota[index] || ''}
                onChangeText={(text) => handleNotaChange(text, index)}
                placeholder="Nota"
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.confirmar} onPress={onPressConfirmarNotas}>
          <Text style={styles.buttonConfirmar}>Confirmar Todas as Notas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262321',
    padding: 20,
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    color: '#262321',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: '#262321',
  },
  inputText: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  confirmar: {
    backgroundColor: '#A6121F',
    marginTop: 30,
    height: 50,
    width: '80%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonConfirmar: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerificarNotas;
