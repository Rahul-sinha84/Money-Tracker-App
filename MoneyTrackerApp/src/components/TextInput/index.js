import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const Index = ({
  label = 'Type',
  keyboardType = 'ascii-capable',
  mode = 'flat',
  onHandleChange,
  initialValue = '',
  isDisabled = false,
}) => {
  const [text, setText] = useState(initialValue);
  const onChangeText = val => {
    setText(val);
    onHandleChange(val);
  };
  return (
    <TextInput
      style={styles.textInp}
      value={text}
      disabled={isDisabled}
      onChangeText={onChangeText}
      label={label}
      mode={mode}
      placeholder="Type here..."
      keyboardType={keyboardType}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  textInp: {
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#f7f7f7',
  },
});
