import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';

const CardHorizontal = ({
  left = () => <></>,
  right = () => <></>,
  toNavigate = null,
  whereToNavigate = '',
}) => {
  const onPress = () => {
    toNavigate != null ? toNavigate.navigate(whereToNavigate) : null;
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container__left}>{left()}</View>
      <View style={styles.container__right}>{right()}</View>
    </TouchableOpacity>
  );
};

export default CardHorizontal;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 25,
    borderRadius: 7,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: '#2998ff',
  },
  container__left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container__right: {},
});
