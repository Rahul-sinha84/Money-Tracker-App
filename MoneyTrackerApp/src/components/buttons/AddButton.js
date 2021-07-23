import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const AddButton = ({text, toNavigate = null, whereToNavigate = ''}) => {
  const onAdding = () => {
    toNavigate != null ? toNavigate.navigate(whereToNavigate) : null;
  };
  return (
    <TouchableOpacity onPress={onAdding} style={styles.container}>
      <Icon name="add-circle-sharp" size={40} color={'green'} />
      <Text style={styles.btnText}>Add {text}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 60,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingRight: 3,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#777',
  },
});
