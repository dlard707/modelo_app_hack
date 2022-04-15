import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors, Metrics, Fonts } from '../values';

import {MyTextInput, MyPasswordInput, MyButton} from '../components'

//Icon
import { MaterialIcons } from '@expo/vector-icons';

export default ({navigation, route}) => {

  const [nomeCompleto,setNomeCompleto] = useState('')
  const [email,setEmail] = useState('')
  const [continente,setContinente] = useState('')

//Monatndo o componente
  useState(() => {
    carregarInformacoes()
  }, [])

  async function carregarInformacoes(){
    try{
      //Obtendo os dados do registro
      const cadastro = await AsyncStorage.getItem(route.params.email)

      //Converter os dados deJSON para Obejto de JavaScript
      const usuario = JSON.parse(cadastro)

      setNomeCompleto(`${usuario.nome} ${usuario.sobrenome}`)
      setEmail(usuario.email)
      setContinente(usuario.continente)
    }
    catch (err){
      console.log(err)
    }
  }

  return (
    <View style={Estilo.container}>
      <Text style={Estilo.textTitle}>Seja Bem Vindo(a)</Text>
      <View style={Estilo.containerIconText}>
        <MaterialIcons name="perm-identity" size={24} color={Colors.white} />
        <Text style={Estilo.text}>{nomeCompleto}</Text>
      </View>
      <View style={Estilo.containerIconText}>
        <MaterialIcons name="mail-outline" size={24} color={Colors.white} />
        <Text style={Estilo.text}>{email}</Text>
      </View>
      <View style={Estilo.containerIconText}>
        <MaterialIcons name="language" size={24} color={Colors.white} />
        <Text style={Estilo.text}>{continente}</Text>
      </View>
      <MyButton style={ Estilo.button } 
                title='Site Cellep' 
                onPress={() => navigation.navigate('WebScreen')}

      />
      <MyButton style={ Estilo.button } 
                title='Sair' 
                onPress={() => navigation.reset({
                  index: 0,
                  routes: [{name: 'LoginScreen'}]
                })}
      />
    </View>
  );
};

const Estilo = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Metrics.padding.base,
  },
  textTitle: {
    fontSize: Fonts.title,
    color: Colors.white,
    marginBottom: Metrics.margin.base,
  },
  containerIconText: {
    flexDirection: 'row',
    marginBottom: Metrics.margin.base,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.base,
    marginLeft: Metrics.margin.small,
  },
  button:{
    marginBottom: Metrics.margin.base
  }
});
