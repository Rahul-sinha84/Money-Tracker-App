import React from 'react';
import {StyleSheet, Text} from 'react-native';

const blkAndclr = ({blkMsg = '', color = '', clrMsg = ''}) => {
  return (
    <Text style={styles.textStyle}>
      {`${blkMsg} `}
      <Text style={{color}}>{clrMsg}</Text>
    </Text>
  );
};

export default blkAndclr;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
});
