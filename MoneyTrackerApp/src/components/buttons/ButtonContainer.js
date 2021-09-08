import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ButtonContainer = ({
  content,
  toNavigate = null,
  whereToNavigate,
  params,
}) => {
  const onPress = () => {
    toNavigate !== null
      ? toNavigate.navigate(whereToNavigate, {id: params})
      : null;
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.parent}>
      {content}
    </TouchableOpacity>
  );
};

export default ButtonContainer;

const styles = StyleSheet.create({
  parent: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
