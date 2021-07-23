import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Heading from '../components/heading/blkAndclr';
import DatePicker from '../components/months/setDateAndTime';

const editMonthScreen = () => {
  const [curMonth, setCurMonth] = useState('prevValue fethched from db');
  const [gotMoneyOn, setGotMoneyOn] = useState(new Date());
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading blkMsg="Modify," clrMsg="This Month" color="#eb2f64" />
      </View>
      <View style={styles.container__lower}>
        <TextInput
          value={curMonth}
          onChangeText={text => setCurMonth(text)}
          style={styles.textInputStyle}
          placeholder="Type here..."
          label="Set Current Month"
        />
        <View style={styles.datePicker_style}>
          <Text style={styles.datePickerLabel}>Set Got Money on</Text>
          <DatePicker
            returnDate={val => {
              setGotMoneyOn(val);
            }}
            prevDate={gotMoneyOn}
          />
        </View>
        <TouchableOpacity>
          <Button style={styles.btnStyle} mode="contained">
            Modify
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default editMonthScreen;

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
  datePicker_style: {
    display: 'flex',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  datePickerLabel: {
    color: '#777',
    marginVertical: 10,
    marginLeft: 15,
  },
});
