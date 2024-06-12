import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ipFacilAcesso } from '../config/config'
import { useNavigation } from '@react-navigation/native';



const DropdownComponent = () => {
  const [socioEmocional, setCompetenciaSocioEmocional] = useState([]);
  const [basicas, setCompetenciaBasica] = useState([]);
  const [tecnicas, setCompetenciasTecnicas] = useState([]);
  const [dropdown1Loading, setDropdown1Loading] = useState(false);
  const [dropdown2Loading, setDropdown2Loading] = useState(false);
  const [dropdown3Loading, setDropdown3Loading] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCompetenciasSociaEmocionais();
    fetchCompetenciasBasicas();
    fetchCompetenciasTecnicas();
  }, []);

  useEffect(() => {
    if (selectedDropdown) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    console.log(selectedDropdown)
  }, [selectedDropdown]);

  const fetchCompetenciasSociaEmocionais = async () => {
    setDropdown1Loading(true);
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/BuscarCompetencia/socioEmocional`);
      const respostaJson = await response.json();
      setCompetenciaSocioEmocional(respostaJson);
    } catch (error) {
      console.error('Erro ao encontrar competências SocioEmocionais:', error);
    } finally {
      setDropdown1Loading(false);
    }
  };

  const fetchCompetenciasBasicas = async () => {
    setDropdown2Loading(true);
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/BuscarCompetencia/basicas`);
      const respostaJson = await response.json();
      setCompetenciaBasica(respostaJson);
    } catch (error) {
      console.error('Erro ao buscar competencias Basicas:', error);
    } finally {
      setDropdown2Loading(false);
    }
  };

  const fetchCompetenciasTecnicas = async () => {
    setDropdown3Loading(true);
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/Competencia/BuscarCompetencia/tecnicas`);
      const respostaJson = await response.json();
      setCompetenciasTecnicas(respostaJson);
    } catch (error) {
      console.error('Erro ao buscar competencias tecnicas:', error);
    } finally {
      setDropdown3Loading(false);
    }
  };

  // const handleAvaliarPress = () => {
  //   navigation.navigate('Avaliar', {
  //     socioEmocional: selectedDropdown,
  //     tecnicas: selectedDropdown,
  //     basicas: selectedDropdown,
  //   });
  // };

  const handleAvaliarPress = () => {
    if (selectedDropdown) {
      navigation.navigate('Avaliar', {
        competenciaSelecionada: selectedDropdown,
      });
    } else {
      console.error('Nenhuma competência selecionada.');
    }
  };

  return (
    <View style={styles.container}>

      {/* COMPETENCIAS SOCIOEMOCIONAIS */}

      <Text style={styles.title}>Competências Socioemocionais</Text>
      <View style={styles.dropdownContent}>
        <Picker
          selectedValue={selectedDropdown}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedDropdown(itemValue);

          }}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma Competência" value={null} color="#9E9E9E" />
          {socioEmocional.map((item) => (
            <Picker.Item key={item.nome} label={item.nome} value={item}  />
          ))}
        </Picker>
        {dropdown1Loading && <Text style={styles.loadingText}>Carregando...</Text>}
      </View>

      {/* COMPETENCIAS TECNICAS */}

      <Text style={styles.title}>Competências Técnicas</Text>
      <View style={styles.dropdownContent}>
        <Picker
          selectedValue={selectedDropdown}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedDropdown(itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma Competência" value={null} color="#9E9E9E" />
          {tecnicas.map((item) => (
            <Picker.Item key={item.nome} label={item.nome} value={item} />
          ))}
        </Picker>
        {dropdown2Loading && <Text style={styles.loadingText}>Carregando...</Text>}
      </View>

      {/* COMPETENCIAS BASICAS */}

      <Text style={styles.title}>Competências Básicas</Text>
      <View style={styles.dropdownContent}>
        <Picker
          selectedValue={selectedDropdown}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedDropdown(itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma Competência" value={null} color="#9E9E9E" />
          {basicas.map((item) => (
            <Picker.Item key={item.id_competencia} label={item.nome} value={item}/>
          ))}
        </Picker>
        {dropdown3Loading && <Text style={styles.loadingText}>Carrega
        ndo...</Text>}
      </View>
      <TouchableOpacity
        style={[styles.actionButton, isButtonDisabled && { backgroundColor: 'gray' }]}
        onPress={handleAvaliarPress}
        disabled={isButtonDisabled}
      >
        <Text style={styles.actionButtonText}>Avaliar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262321',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',  // Centraliza o título
  },
  dropdownContent: {
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#fff', // Altera a cor do seletor para branco
  },
  actionButton: {
    marginTop: 50,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6121F',
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
  },
});
