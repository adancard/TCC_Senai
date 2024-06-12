import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import IconFeat from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconAw5 from 'react-native-vector-icons/FontAwesome5';


const TelaCurricular = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
         
        <TouchableOpacity style={styles.buttonBack} onPress={() => {navigation.navigate('TelaTurmas')}}>
          <IconAnt name='arrowleft' size={25} color={'#000'}/>
        </TouchableOpacity>

        <Text style={styles.headerText}>UNIDADE CURRICULAR</Text>

      </View>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Projeto')}>
         <IconAnt name='folderopen' size={105} color={'#fff'}/>
          <Text style={styles.iconText}>Projeto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Botão 2 pressionado")}>
          <IconAnt name='barschart' size={105} color={'#fff'}/>
          <Text style={styles.iconText}>Teste de software</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Botão 3 pressionado")}>
          <IconAw5 name='clipboard' size={105} color={'#fff'}/>
          <Text style={styles.iconText}>Requisitos de modelagem</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262321',
  },
  iconButton: {
    alignItems: 'center',
    marginTop: 50,
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
    paddingTop: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  logOffContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinhar os elementos verticalmente
    justifyContent: 'start', // Alinhar os elementos horizontalment
    marginLeft: 15,
    top: 500
  },
  buttonBack: {
    paddingLeft: 15,
    marginRight: 55,
  }
});

export default TelaCurricular;