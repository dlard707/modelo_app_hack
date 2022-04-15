import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors, Metrics } from '../values';

import { MyTextInput, MyPasswordInput, MyButton } from '../components';

import { MaterialIcons } from '@expo/vector-icons';

//Caixa de seleção
import { Picker } from '@react-native-picker/picker';

export default (props) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [continente, setContinente] = useState('');

  const listaContinentes = [
    'América do Norte',
    'América Central',
    'América do Sul',
    'Europa',
    'Ásia',
    'África',
    'Oceania',
    'Antártida',
  ];

  async function cadastrar() {
    // console.log('cadastrado');
    //consistencias
    if( nome == '' || sobrenome == '' || email == '' || continente == ''){
      alert('Preencha todos os campos')
      return
    }
    //definir a estrutura do usuario
    const usuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email.toLowerCase(),
      senha: senha,
      continente: continente
    }

    try{
      const dados = await JSON.stringify(usuario)
      //armazena em um arquivo com o nome do email
      await AsyncStorage.setItem(email, dados)
      //Navegar para a tela de perfil
      props.navigation.reset({
        index: 0,
        routes: [ { name: 'PerfilScreen', params: {email: email} } ]
      })
    } catch(err){
      console.log(err)
    }
  }

  return (
    <ScrollView style={Estilo.container}>
      <View style={Estilo.containerIcon}>
        <MaterialIcons name="person-add" size={100} color="white" />
      </View>
      <MyTextInput
        placeholder="Nome"
        style={Estilo.formItem}
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <MyTextInput
        placeholder="Sobrenome"
        style={Estilo.formItem}
        value={sobrenome}
        onChangeText={(text) => setSobrenome(text)}
      />
      <MyTextInput
        placeholder="E-mail"
        style={Estilo.formItem}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={Estilo.containerPicker}>
        <Picker
          style={Estilo.picker}
          selectedValue={continente}
          onValueChange={(value, index) => setContinente(value)}>
          <Picker.Item value="" label="Continente" />
          {listaContinentes.map((value, index) => (
            <Picker.Item value={value} label={value} />
          ))}
        </Picker>
      </View>

      <MyPasswordInput
        placeholder="Senha"
        style={Estilo.formItem}
        keyboardType="numeric"
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <MyButton
        title="Cadastrar"
        style={Estilo.formItem}
        onPress={() => cadastrar()}
      />
    </ScrollView>
  );
};

const Estilo = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: Metrics.padding.base,
  },
  containerIcon: {
    alignItems: 'center',
  },
  formItem: {
    marginBottom: Metrics.margin.base,
  },
  containerPicker: {
    borderWidth: 1,
    borderRadius: Metrics.radius.base,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    marginBottom: Metrics.margin.base,
  },
  picker: {
    paddingVertical: Metrics.padding.small,
    paddingHorizontal: Metrics.padding.base,
    borderWidth: 0,
    backgroundColor: Colors.white,
  },
});
