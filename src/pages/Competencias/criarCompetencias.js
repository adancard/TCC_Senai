import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ipFacilAcesso } from '../config/config'

export default function App() {
  const [textCompetencia, setTextCompetencia] = useState('');
  const [escolhaBotao, setEscolhaBotao] = useState('');
  const [escolhaBotaoCriticidade, setEscolhaBotaoCriticidade] = useState('');
  const [textCriticidade, setTextCriticidade] = useState('');
  const [criterios, setCriterios] = useState([]);
  const [competenciasTecnicas, setTecnicas] = useState([]);
  const [competenciasSocioEmocionais, setSocioEmocionais] = useState([]);
  const [competenciasBasicas, setBasicas] = useState([]);
  const [criteriosDaCompetencia, setCriteriosDaCompetencia] = useState([]);
  const [selectedCompetenciaId, setSelectedCompetenciaId] = useState(null);
  const [botaoSelecionadoComp, setBotaoSelecionadoComp] = useState(null);
  const [botaoSelecionadoCrit, setBotaoSelecionadoCrit] = useState(null);

  const selecionarBotaoComp = (botao) => {
    setBotaoSelecionadoComp(botao);
  };

  const selecionarBotaoCrit = (botaoDC) => {
    setBotaoSelecionadoCrit(botaoDC);
  }



  useEffect(() => {
    const fetchCompetenciasSocioEmocionais = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/BuscarCompetencia/socioEmocional`);
        const data = await response.json();
        setSocioEmocionais(data);
      } catch (error) {
        console.error('Erro ao buscar as competências:', error);
      }
    };
    const fetchCompetenciasTecnicas = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/BuscarCompetencia/tecnicas`);
        const data = await response.json();
        setTecnicas(data);
      } catch (error) {
        console.error('Erro ao buscar as competências:', error);
      }
    };

    const fetchCompetenciasBasicas = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/BuscarCompetencia/basicas`);
        const data = await response.json();
        setBasicas(data);
      } catch (error) {
        console.error('Erro ao buscar as competências:', error);
      }
    };

    const fetchCriterios = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/Criterios/BuscarCriterios`);
        const data = await response.json();
        setCriterios(data);
      } catch (error) {
        console.error('Erro ao buscar os critérios:', error);
      }
    };

    fetchCompetenciasBasicas();
    fetchCompetenciasTecnicas();
    fetchCompetenciasSocioEmocionais();
    fetchCriterios();
  }, []);

  const carregarCriteriosDaCompetencia = async (competenciaId) => {
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/consulta_Competencia/${competenciaId}`);
      const data = await response.json();
      setCriteriosDaCompetencia(data);
    } catch (error) {
      console.error('Erro ao carregar os critérios:', error);
    }
  };

  const onPressConfirmarCompetencia = async () => {

    if(textCompetencia.trim() === ''){
      alert('Por favor, preencha o campo para prosseguir')
      return;
    }
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/CriarCompetencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: textCompetencia, tipo: escolhaBotao }),
      });
       if (response.ok) {
        const newCompetencia = await response.json();
        if (escolhaBotao === 'socioemocional') {
          setSocioEmocionais([...competenciasSocioEmocionais, newCompetencia]);
        } else if (escolhaBotao === 'tecnica') {
          setTecnicas([...competenciasTecnicas, newCompetencia]);
        } else if (escolhaBotao === 'basica') {
          setBasicas([...competenciasBasicas, newCompetencia]);
        }
        console.log('Competência criada com sucesso!');
        Alert.alert('Sucesso', 'Competência criada com sucesso!');
        setTextCompetencia(''); // Limpar o campo de texto após a inserção
      } else {
        console.error('Falha ao enviar os dados da competência.');
        Alert.alert('Erro', 'Falha ao enviar os dados da competência.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      Alert.alert('Erro', 'Erro ao enviar os dados da competência.');
    }
    setBotaoSelecionadoComp(null);
  };

  const onPressConfirmarCriticidade = async () => {

    if(textCriticidade.trim() === ''){
      alert('Por favor, preencha o campo para prosseguir')
      return;
    }
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Criterios/CriarCriterio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: textCriticidade, tipoCriticidades: escolhaBotaoCriticidade, id_competencia: selectedCompetenciaId }),
      });

      if (response.ok) {
        console.log('Critério criado com sucesso!');
        Alert.alert('Sucesso', 'Critério criado com sucesso!');
        setTextCriticidade(''); // Limpar o campo de texto após a inserção
      } else {
        console.error('Falha ao enviar os dados do critério.');
        Alert.alert('Erro', 'Falha ao enviar os dados do critério.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      Alert.alert('Erro', 'Erro ao enviar os dados do critério.');
    }
    setBotaoSelecionadoCrit(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Adicionar Competência</Text>
      <View style={styles.Containersbt}>
        <TouchableOpacity style={[styles.botao, botaoSelecionadoComp === 'socioemocional' && styles.botaoSelecionadoComp]} onPress={() => {setEscolhaBotao('socioemocional'); selecionarBotaoComp('socioemocional')}}>
          <Text style={styles.textoButton}>Socio-Emocionais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, botaoSelecionadoComp === 'tecnica' && styles.botaoSelecionadoComp]} onPress={() => {setEscolhaBotao('tecnica'); selecionarBotaoComp('tecnica')}}>
          <Text style={styles.textoButton}>Tecnica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, botaoSelecionadoComp === 'basica' && styles.botaoSelecionadoComp]} onPress={() => {setEscolhaBotao('basica'); selecionarBotaoComp('basica')}}>
          <Text style={styles.textoButton}>Basica</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.InputText}
        value={textCompetencia}
        onChangeText={setTextCompetencia}
        placeholder="Digite a Competência"
      />

      <TouchableOpacity style={styles.confirmar} onPress={onPressConfirmarCompetencia}>
        <Text style={styles.buttonConfirmar}>Confirmar</Text>
      </TouchableOpacity>

      <Text style={styles.tituloCriticidade}>Adicionar Critério</Text>
      <View>

      </View>

      <Picker
        selectedValue={selectedCompetenciaId}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedCompetenciaId(itemValue);
          carregarCriteriosDaCompetencia(itemValue);
        }}
      >
        <Picker.Item label="SocioEmocionais" value={null} color='#9E9E9E' />
        {competenciasSocioEmocionais.map((competencia) => (
          <Picker.Item
            key={competencia.id_competencia}
            label={competencia.nome}
            value={competencia.id_competencia}
          />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedCompetenciaId}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedCompetenciaId(itemValue);
          carregarCriteriosDaCompetencia(itemValue);
        }}
      >
        <Picker.Item label="Tecnicas" value={null} color='#9E9E9E' />
        {competenciasTecnicas.map((competencia) => (
          <Picker.Item
            key={competencia.id_competencia}
            label={competencia.nome}
            value={competencia.id_competencia}
          />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedCompetenciaId}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedCompetenciaId(itemValue);
          carregarCriteriosDaCompetencia(itemValue);
        }}
      >
        <Picker.Item label="Basicas" value={null} color='#9E9E9E' />
        {competenciasBasicas.map((competencia) => (
          <Picker.Item
            key={competencia.id_competencia}
            label={competencia.nome}
            value={competencia.id_competencia}
          />
        ))}
      </Picker>
      <TextInput
        style={styles.InputText}
        value={textCriticidade}
        onChangeText={setTextCriticidade}
        placeholder="Digite o Critério"
      />
      <View style={styles.Containersbt}>
        <TouchableOpacity style={[styles.botaoDC, botaoSelecionadoCrit === 'Desejada' && styles.botaoSelecionadoCrit]} onPress={() => {setEscolhaBotaoCriticidade('Desejada'); selecionarBotaoCrit('Desejada')}}>
          <Text style={styles.textoButton}>Desejavel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botaoDC, botaoSelecionadoCrit === 'Critica' && styles.botaoSelecionadoCrit]} onPress={() => {setEscolhaBotaoCriticidade('Critica'); selecionarBotaoCrit('Critica')}}>
          <Text style={styles.textoButton}>Critico</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmar} onPress={onPressConfirmarCriticidade}>
        <Text style={styles.buttonConfirmar}>Confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262321',
  },
  Containersbt: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 100,
    marginTop: 20,
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 50,
  },
  tituloCriticidade: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 50,
  },
  botao: {
    backgroundColor: '#a1a1a1',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  textoButton: {
    textAlign: 'center',
    color: 'white',
  },
  InputText: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    borderRadius: 5,
    textAlign: 'center',
    height: 50,
    width: 300,
    marginTop: 30,
  },
  confirmar: {
    marginBottom: 150,
    alignSelf: 'center',
    backgroundColor: '#A6121F',
    marginTop: 30,
    height: 40,
    width: 200,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonConfirmar: { color: 'white', textAlign: 'center', paddingVertical: 10 },
  picker: {
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#D9D9D9',
  },
  botaoDC: {
    backgroundColor: '#a1a1a1',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  botaoSelecionadoComp: {
    backgroundColor: 'green'
  },
  botaoSelecionadoCrit: {
    backgroundColor: 'green',
  },
});
