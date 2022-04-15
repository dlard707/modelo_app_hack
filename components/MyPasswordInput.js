import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// Icon
import { Ionicons } from '@expo/vector-icons';

import { Colors, Metrics } from '../values';

export default (props) => {

  const[escondido,setEscondido] = useState(true)

  const { style, ...rest } = props;

  return (
    <View style={[Estilo.container, style]}>
      <TextInput style={Estilo.input} 
      {...rest} 
      secureTextEntry = {escondido}
      />
      
      <TouchableOpacity
      onPress={() => setEscondido(!escondido)}
      >
        <Ionicons name={ escondido ? "eye-off-sharp" : "eye-sharp"} size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

const Estilo = StyleSheet.create({
  input: {
    flexGrow: 1,
    marginRight: Metrics.margin.small,
    paddingVertical: Metrics.padding.small
  },
  container: {
    flexDirection: 'row',
    height: 48,
    borderWidth: 1,
    borderRadius: Metrics.radius.base,
    paddingHorizontal:Metrics.padding.base,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  formItem:{
    marginBottom: Metrics.margin.base
  }
});
