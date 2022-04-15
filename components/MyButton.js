import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Metrics, Fonts } from '../values';

export default (props) => {
  const { style, ...rest } = props;

  return (
    <TouchableOpacity
      style={[
        Estilo.button,
        style,
        { backgroundColor: props.color || Colors.primary },
      ]}>
      <Text style={Estilo.text} {...rest}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const Estilo = StyleSheet.create({
  button: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.radius.base
  },
  text: {
    fontSize: Fonts.buttonText,
    color: Colors.white,
    textTransform: 'uppercase',
  },
});
