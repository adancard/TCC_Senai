import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import IconFeat from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TelaTurmas = ({ navigation }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.navigate('Login')}>
        <MaterialCommunityIcons name='exit-to-app' size={28} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>TURMAS</Text>
      </View>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Currículo')}>
         <IconFeat name='book' size={105} color={'#fff'}/>
          <Text style={styles.iconText}>3MDS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Botão 2 pressionado")}>
          <IconFeat name='bookmark' size={105} color={'#fff'}/>
          <Text style={styles.iconText}>3TDS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Botão 3 pressionado")}>
          <IconFeat name='book-open' size={105} color={'#fff'}/>
          <Text style={styles.iconText}>2TDP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate ('criarTurmasEAlunos')}>
          <IconAnt name='pluscircleo' size={35} color={'#fff'}/>
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
  addButton: {
    position: 'absolute',
    left: 20,
    top: 110,
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
  drawerButton: {
    position: 'absolute',
    right: '90%'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

});

export default TelaTurmas;