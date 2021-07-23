import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const index = ({
  label = 'Type',
  keyboardType = 'ascii-capable',
  mode = 'flat',
  onHandleChange,
  initialValue = '',
}) => {
  const [text, setText] = useState(initialValue);
  const onChangeText = val => {
    setText(val);
    onHandleChange(text);
  };
  return (
    <TextInput
      style={styles.textInp}
      value={initialValue}
      onChangeText={onChangeText}
      label={label}
      mode={mode}
      placeholder="Type here..."
      keyboardType={keyboardType}
    />
  );
};

export default index;

const styles = StyleSheet.create({
  textInp: {
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#f7f7f7',
  },
});
