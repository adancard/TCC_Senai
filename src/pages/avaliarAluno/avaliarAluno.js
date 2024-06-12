import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ipFacilAcesso } from '../config/config'
import { useRoute } from '@react-navigation/native';

// Componente funcional AvaliarAluno
const AvaliarAluno = () => {
  // Estados para armazenar dados dos alunos, critérios, status, etc.
  const route = useRoute();
  const { competenciaSelecionada } = route.params;
  const [alunos, setAlunos] = useState([]); // Armazena os dados dos alunos
  const [criterios, setCriterios] = useState([]); // Armazena os dados dos critérios
  const [status, setStatus] = useState({}); // Armazena o status dos alunos
  const [selectedCriterioId, setSelectedCriterioId] = useState(null); // Armazena o ID do critério selecionado
  const [criteriosSelecionados, setCriteriosSelecionados] = useState([]); // Armazena os critérios selecionados
  const [avaliados, setAvaliados] = useState([]); // Armazena os dados dos alunos avaliados
  const criteriosDesejados = criterios.filter(criterio => criterio.tipoCriticidades === "Desejada");
  const [successAlertShown, setSuccessAlertShown] = useState(false);

  // Filtrar critérios críticos
  const criteriosCriticos = criterios.filter(criterio => criterio.tipoCriticidades === "Critica");

  // Hook useEffect para carregar os dados dos alunos, critérios e avaliações ao iniciar o componente
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/alunos/TodosAlunos`); // Requisição para obter dados dos alunos
        const data = await response.json(); // Converte a resposta para JSON
        console.log('Dados dos Alunos:', data); // Registra os dados dos alunos no console
        setAlunos(data); // Atualiza o estado 'alunos' com os dados obtidos

        // Inicializa o estado 'status' com valores padrão 'null' para cada aluno
        const initialStatus = {};
        data.forEach((aluno) => {
          initialStatus[aluno.num_matricula_aluno] = null; // Inicializa com null
        });
        setStatus(initialStatus); // Atualiza o estado 'status' com os valores iniciais
      } catch (error) {
        console.error('Erro ao buscar Alunos:', error); // Registra um erro no console, se houver
      }
    };

    const fetchCriterios = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/Criterios/BuscarCriterios`);
        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (!Array.isArray(data)) {
          console.error('Dados inválidos recebidos do servidor');
          return;
        }

        const filteredCriterios = data.filter(criterio =>
          criterio.id_competencia === competenciaSelecionada.id_competencia
        );

        console.log('Critérios filtrados:', filteredCriterios);
        setCriterios(filteredCriterios);
      } catch (error) {
        console.error('Erro ao buscar critérios:', error);
      }
    };

    const fetchAvaliados = async () => {
      try {
        const response = await fetch(`http://${ipFacilAcesso}:8080/AlunoCriterio/TodosAvaliados`); // Requisição para obter dados dos alunos avaliados
        const data = await response.json(); // Converte a resposta para JSON
        console.log('Dados dos Avaliados:', data); // Registra os dados dos alunos avaliados no console
        setAvaliados(data); // Atualiza o estado 'avaliados' com os dados obtidos
      } catch (error) {
        console.error('Erro ao buscar avaliados:', error); // Registra um erro no console, se houver
      }
    };

    fetchAvaliados(); // Chama a função para buscar os dados dos alunos avaliados
    fetchCriterios(); // Chama a função para buscar os dados dos critérios
    fetchAlunos(); // Chama a função para buscar os dados dos alunos
  }, []); // O array vazio indica que o efeito será executado apenas uma vez, após a montagem inicial do componente



  const fetchAvaliados = async () => {
    try {
      const response = await fetch(`http://${ipFacilAcesso}:8080/AlunoCriterio/TodosAvaliados`); // Requisição para obter dados dos alunos avaliados
      const data = await response.json(); // Converte a resposta para JSON
      console.log('Dados dos Avaliados:', data); // Registra os dados dos alunos avaliados no console
      setAvaliados(data); // Atualiza o estado 'avaliados' com os dados obtidos
    } catch (error) {
      console.error('Erro ao buscar avaliados:', error); // Registra um erro no console, se houver
    }
  };

  // Função para lidar com a mudança de status de um aluno
  const handleStatusChange = (alunoId, value) => {
    console.log('Novo status:', value);
    setStatus(prevStatus => {
      const newStatus = { ...prevStatus, [alunoId]: value }; // Cria um novo objeto de status com o status atualizado para o aluno específico
      console.log('Estado status atual:', newStatus);
      return newStatus; // Retorna o novo objeto de status
    });
  };

  // Função para avaliar um aluno
  const onPressAvaliarAluno = async (aluno) => {
    try {
      if (!selectedCriterioId) {
        console.error('Nenhum critério selecionado.');
        return;
      }

      console.log('Status atual:', status);

      if (!status[aluno.num_matricula_aluno]) {
        console.error('Nenhum status selecionado para o aluno.');
        return;
      }

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

      console.log(currentDate);

      const payload = {
        id_criterioAluno: selectedCriterioId,
        num_matricula_aluno_capacidade: aluno.num_matricula_aluno,
        avaliado: status[aluno.num_matricula_aluno],
        data: currentDate,
      };

      console.log('Payload:', payload);

      const alunoAvaliado = avaliados.find(avaliado =>
        avaliado.num_matricula_aluno_capacidade === aluno.num_matricula_aluno &&
        avaliado.id_criterioAluno === selectedCriterioId
      );

      if (alunoAvaliado) {
        const response = await fetch(`http://${ipFacilAcesso}:8080/AlunoCriterio/atualizarAvaliacao/matricula/${aluno.num_matricula_aluno}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Erro ao atualizar dados:', response.statusText);
        } else {
          console.log('Dados atualizados com sucesso.');
        }
      } else {
        const response = await fetch(`http://${ipFacilAcesso}:8080/AlunoCriterio/criarAvaliados`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Erro ao enviar dados:', response.statusText);
        } else {
          console.log('Dados enviados com sucesso.');
        }
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };


 // Função para enviar avaliações para todos os alunos
const enviarAvaliacoesParaTodosAlunos = async () => {
  try {
    let alunosAvaliados = false; // Variável para rastrear se algum aluno foi avaliado ou atualizado com sucesso

    await Promise.all(alunos.map(async (aluno) => {
      await onPressAvaliarAluno(aluno);
      alunosAvaliados = true; // Define como true se algum aluno foi avaliado com sucesso
    }));

    // Verifica se algum aluno foi avaliado ou atualizado com sucesso antes de mostrar o alerta
    if (alunosAvaliados) {
      Alert.alert('Sucesso', 'Alunos Avaliados ou Atualizados com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao enviar avaliações:', error);
  }

  fetchAvaliados();
};

  // Componente de interface do usuário
  return (
    <SafeAreaView style={styles.container}>
      {/* Componente Picker para selecionar o critério */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Critérios Desejados:</Text>
        <Picker
          selectedValue={selectedCriterioId}
          style={styles.cell2}
          onValueChange={(itemValue) => setSelectedCriterioId(itemValue)}
        >
          <Picker.Item label="Selecione um critério" value={null} color="#9E9E9E" />
          {criteriosDesejados.map((criterio) => (
            <Picker.Item
              key={criterio.id_Criterio.toString()}
              label={criterio.nome}
              value={criterio.id_Criterio}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Critérios Críticos:</Text>
        <Picker
          selectedValue={selectedCriterioId}
          style={styles.cell2}
          onValueChange={(itemValue) => setSelectedCriterioId(itemValue)}
        >
          <Picker.Item label="Selecione um critério" value={null} color="#9E9E9E" />
          {criteriosCriticos.map((criterio) => (
            <Picker.Item
              key={criterio.id_Criterio.toString()}
              label={criterio.nome}
              value={criterio.id_Criterio}
            />
          ))}
        </Picker>
      </View>

      {/* Componente ScrollView para exibir a lista de alunos */}
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.table}>
          {/* Cabeçalho da tabela */}
          <View style={styles.row}>
            <Text style={styles.header}>Alunos</Text>
            <Text style={styles.header}>Status</Text>
          </View>
          {/* Mapeia os alunos para exibir na tabela */}
          {alunos.map((aluno) => (
            <View key={aluno.num_matricula_aluno} style={styles.row}>
              <Text style={styles.cell}>{aluno.nome}</Text>
              <View style={styles.cell}>
                {/* Botões para selecionar o status do aluno */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      status[aluno.num_matricula_aluno] === 'SIM' ? styles.buttonSelected : null
                    ]}
                    onPress={() => handleStatusChange(aluno.num_matricula_aluno, "SIM")}
                  >
                    <Text style={styles.buttonText}>Atingiu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      status[aluno.num_matricula_aluno] === 'NAO' ? styles.buttonSelected2 : null
                    ]}
                    onPress={() => handleStatusChange(aluno.num_matricula_aluno, "NAO")}
                  >
                    <Text style={styles.buttonText}>Não Atingiu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Botão para enviar avaliações para todos os alunos */}
      <TouchableOpacity style={styles.botao} onPress={enviarAvaliacoesParaTodosAlunos}>
        <Text style={styles.textoButton}>Enviar para Todos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Estilos para o componente
const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#A6121F',
    borderColor: 'black',
    borderWidth: 1,
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
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#262321',
    justifyContent: 'center',
    alignItems: 'center',
  },
  competenciaText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 90,
    color: 'white', // Cor do texto em branco
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 18,
    textAlign:'center',
    marginTop:20,
    color: 'white', // Cor do texto em branco
  },
  table: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 0,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%'
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
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc', 
  },
  cell2: {
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#D9D9D9',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
  buttonSelected: {
    backgroundColor: '#36C139',
  },
  buttonSelected2: {
    backgroundColor: '#A6121F'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default AvaliarAluno; // Exporta o componente AvaliarAluno
