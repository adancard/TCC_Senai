import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import IconFeat from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';



const TelaProjeto = ({ navigation }) => {
  return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>

          <TouchableOpacity style={styles.buttonBack} onPress={() => {navigation.navigate('Currículo')}}>
            <IconAnt name='arrowleft' size={25} color={'#000'}/>
          </TouchableOpacity>

          <Text style={styles.headerText}>PROJETO</Text>

          <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('TelaTurmas')}>
            <IconEnt name='home' size={28} color={'#000'} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContent}>

          <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('TelaPDF')}>
            <Text style={styles.buttonsText}>Unidade</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('TelaNota')} >
            <Text style={styles.buttonsText}>somar Notas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('VisualizarNotas')} >
            <Text style={styles.buttonsText}>Avaliar Notas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Tabela")}>
        <IconAnt name='filetext1' size={105} color={'#fff'} />
        <Text style={styles.iconText}>Escolher Competência</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CriarCompetencias')}>
        <IconAnt name='addfile' size={105} color={'#fff'} />
        <Text style={styles.iconText}>Criar Competencias/Critérios</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262321',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 75,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonHome: {
    position: 'absolute',
    left: '87%'
  },
  buttons: {
    backgroundColor: '#a0a0a0',
    width: 95,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginLeft: 15,
    borderRadius: 20,
    marginRight: 25,
  },
  buttonsContent: {
    flexDirection: 'row',
  },
  buttonsText: {
    color: '#1d1d1d'
  },
  content: {
    borderWidth: 0.5,
    borderColor: '#a0a0a0',
    height: 200,
    width: '90%',
    marginTop: 50,
    borderRadius: 5
  },
  iconButton: {
    alignItems: 'center',
    marginTop: 45,
    paddingTop: 50
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
    paddingTop: 15,
  },
  buttonBack: {
    position: 'absolute',
    right: '90%'
  }
});

export default TelaProjeto;