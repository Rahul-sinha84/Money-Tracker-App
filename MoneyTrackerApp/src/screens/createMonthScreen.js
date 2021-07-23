import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Heading from '../components/heading/blkAndclr';

const createMonthScreen = () => {
  const [curMonth, setCurMonth] = useState('');
  const [amt, setAmt] = useState(null);
  //have to send a post request of current date as well...
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading clrMsg="New Month" blkMsg="Manage," color="#55c57a" />
      </View>
      <View style={styles.container__lower}>
        <TextInput
          value={curMonth}
          onChangeText={text => setCurMonth(text)}
          style={styles.textInputStyle}
          placeholder="Type here..."
          label="Current Month"
        />
        <TextInput
          value={amt}
          onChangeText={text => setAmt(text)}
          style={styles.textInputStyle}
          placeholder="Type here..."
          keyboardType="decimal-pad"
          label="Total Amount this month"
        />
        <TouchableOpacity>
          <Button style={styles.btnStyle} mode="contained">
            Create
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default createMonthScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'lightgreen',
    flex: 0.89,
    justifyContent: 'space-evenly',
  },
  container__upper: {
    // backgroundColor: 'pink',
    // marginVertical: 20,
  },
  headingStyle: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'grey',
  },
  container__lower: {
    // backgroundColor: 'white',
  },
  textInputStyle: {
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#f7f7f7',
  },
  btnStyle: {
    marginHorizontal: 145,
    paddingVertical: 4,
  },
});
