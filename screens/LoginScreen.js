import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MyTextInput, MyPasswordInput, MyButton } from '../components';

import { Colors, Metrics, Fonts } from '../values';

export default (props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin() {
    //consistencias
    if (email == '') {
      alert('Preencha o E-mail');
      return;
    } else if (senha == '') {
      alert('Preencha a Senha');
      return;
    }

    try {
      //Obtendo os dados do registro
      const cadastro = await AsyncStorage.getItem(email);
      //converter os dados do JSON para Objeto de Javascript
      const usuario = JSON.parse(cadastro);
      if (usuario != null) {
        //validar o email e senha
        if (email == usuario.email && senha == usuario.senha) {
          //navega para a tela de perfil
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'PerfilScreen', params: { email: email } }],
          });
        }
      } else {
        alert('Email ou senha inválidos');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={Estilo.container}>
      <View style={Estilo.containerLogin}>
        <View style={Estilo.containerLogoCellep}>
          <Image source={require('../assets/logo_cellep.png')} />
        </View>

        <MyTextInput
          placeholder="E-mail"
          style={Estilo.formItem}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <MyPasswordInput
          placeholder="Senha"
          style={Estilo.formItem}
          keyboardType="numeric"
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        <MyButton
          title="Entrar"
          style={Estilo.formItem}
          onPress={() => fazerLogin()}
        />

        <View style={Estilo.containerCadastro}>
          <Text style={Estilo.cadastroText}>Não tem cadastro?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CadastroScreen')}>
            <Text style={Estilo.cadastroTextTouch}>Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Estilo.containerLogoHack}>
        <Image
          source={require('../assets/logo_estacao_hack.png')}
          style={Estilo.logoEH}
        />
      </View>
    </View>
  );
};

const Estilo = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: Metrics.padding.base,
  },
  containerLogin: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerLogoCellep: {
    alignItems: 'center',
    marginBottom: Metrics.margin.base,
  },
  formItem: {
    marginBottom: Metrics.margin.base,
  },
  containerCadastro: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cadastroText: {
    color: Colors.white,
  },
  cadastroTextTouch: {
    color: Colors.primary,
    fontWeight: 'bold',
    paddingLeft: Metrics.padding.small,
  },
  logoEH: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  containerLogoHack: {
    alignItems: 'flex-end',
  },
});
