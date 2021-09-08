import React from 'react';
import {StyleSheet} from 'react-native';
import IconCreate from 'react-native-vector-icons/MaterialIcons';
import ButtonContainer from './ButtonContainer';
const EditButton = ({toNavigate, whereToNavigate, params}) => {
  return (
    <ButtonContainer
      toNavigate={toNavigate}
      params={params}
      whereToNavigate={whereToNavigate}
      content={<IconCreate name="create" size={40} color="#2998ff" />}
    />
  );
};

export default EditButton;

const styles = StyleSheet.create({});
