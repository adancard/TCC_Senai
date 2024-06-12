import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ipFacilAcesso } from '../config/config'

const CriarTurmasEAlunos = () => {
    const [turmaNome, setTurmaNome] = useState('');
    const [cursoSelecionado, setCursoSelecionado] = useState('');
    const [selectPeriodo, setSelectPeriodo] = useState('');
    

    
    const cursosEnum = [
        'Administração', 'Desenvolvimento de Sistemas', 'Mecatronica'
    ];

    const periodosEnum = ['manhã', 'tarde', 'noite', 'Sábado', 'outro'];

    const OnPressConfirmarCriarTurma = async () => {
        if (turmaNome.trim() === '') {
            Alert.alert('Por favor, preencha o nome da turma para prosseguir');
            return;
        }
        if (!cursoSelecionado) {
            Alert.alert('Por favor, selecione um curso');
            return;
        }
        if (selectPeriodo.trim() === '') {
            Alert.alert('Por favor, selecione um período para prosseguir');
            return;
        }

        const turmaData = {
            nome: turmaNome,
            curso_turma: cursoSelecionado,
            periodo: selectPeriodo
        };

        try {
            const response = await fetch(`http://${ipFacilAcesso}:8080/Turmas/CriarTurmas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(turmaData),
            });

            if (response.ok) {
                Alert.alert('Turma Criada com sucesso');
                setTurmaNome('');
                setCursoSelecionado('');
                setSelectPeriodo('');
            } else {
                console.error('Erro ao criar turma', await response.text());
                Alert.alert('Erro ao enviar dados de criação de turma');
            }
        } catch (error) {
            console.error('Erro ao criar turma', error);
            Alert.alert('Erro ao enviar dados de criação de turma');
        }
    };

    return (
        <View style={styles.containerView}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.textIndicativo}>Preencha as informações abaixo</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nome da turma"
                    placeholderTextColor="#9E9E9E"
                    value={turmaNome}
                    onChangeText={setTurmaNome}
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={cursoSelecionado}
                        onValueChange={(itemValue) => setCursoSelecionado(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um Curso" value="" color="#9E9E9E" />
                        {cursosEnum.map((curso) => (
                            <Picker.Item
                                key={curso}
                                label={curso}
                                value={curso}
                            />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectPeriodo}
                        onValueChange={(itemValue) => setSelectPeriodo(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um Período" value="" color="#9E9E9E" />
                        {periodosEnum.map((periodo) => (
                            <Picker.Item
                                key={periodo}
                                label={periodo}
                                value={periodo}
                            />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity style={styles.botaoCriarTurma} onPress={OnPressConfirmarCriarTurma}>
                    <Text style={styles.buttonConfirmar}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default CriarTurmasEAlunos;

const styles = StyleSheet.create({
    containerView: {
        height: '100%',
        backgroundColor: '#262321',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textIndicativo: {
        marginTop: 40,
        marginBottom: 20,
        color: 'white',
        fontSize: 20,
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 20,
        width: 200,
        height: 40,
        textAlign: 'center',
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 20,
        width: 200,
    },
    picker: {
        color: 'black',
    },
    botaoCriarTurma: {
        marginTop: 20,
        width: '50%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A6121F',
        borderRadius: 5,
    },
    buttonConfirmar: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
    },
});
