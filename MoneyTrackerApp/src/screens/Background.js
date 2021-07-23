import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Background = ({content}) => {
  return <View style={styles.container}>{content}</View>;
};

export default Background;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: '100%',
    padding: 5,
  },
});
