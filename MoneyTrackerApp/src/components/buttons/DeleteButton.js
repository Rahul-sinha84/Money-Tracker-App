import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IconDelete from 'react-native-vector-icons/MaterialIcons';
import ButtonContainer from './ButtonContainer';

const DeleteButton = ({id = '', toNavigate = null, whereToNavigate = ''}) => {
  return (
    <ButtonContainer
      toNavigate={toNavigate}
      whereToNavigate={whereToNavigate}
      params={id}
      toDelete={true}
      content={<IconDelete name="delete" size={40} color="#eb2f64" />}
    />
  );
};

export default DeleteButton;

const styles = StyleSheet.create({});
