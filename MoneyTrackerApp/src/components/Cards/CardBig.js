import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

const Card = ({upper = () => <></>, bottom = () => <></>}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__upper}>{upper()}</View>
      <View style={styles.container__lower}>{bottom}</View>
    </SafeAreaView>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 50,
    marginHorizontal: 25,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'space-evenly',
    height: 180,
  },
  container__upper: {
    display: 'flex',
    alignItems: 'center',
  },
  container__lower: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
