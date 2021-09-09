import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Heading from '../components/heading/blkAndclr';
import DatePicker from '../components/months/setDateAndTime';
import axios from '../axios/server';

const EditMonthScreen = ({navigation, route}) => {
  const [curMonth, setCurMonth] = useState('prevValue fethched from db');
  const [gotMoneyOn, setGotMoneyOn] = useState(new Date());

  useEffect(() => {
    if (route.params) {
      const {gotMoneyOn, currentMonth} = route.params.id;
      setCurMonth(currentMonth);
      setGotMoneyOn(gotMoneyOn);
    }
  }, [route]);

  const onPress = async () => {
    if (!curMonth) {
      return Alert.alert('Please fill the required blank !!');
    }
    await axios
      .post('/', {
        query: `
        mutation {
          editMonth(
          _id:"${route.params.id._id}",
          currentMonth:"${curMonth}",
          gotMoneyOn:"${gotMoneyOn}") {
            ...on MonthExp {
              _id
              currentMonth
              gotMoneyOn
            }
            ...on errMessage {
              msg
            }
          }
        }
      `,
      })
      .then(response => {
        navigation.navigate('MonthScreen');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Something went wrong, please try again later !!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Heading blkMsg="Modify," clrMsg="This Month" color="#eb2f64" />
      </View>
      <View>
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
        <TouchableOpacity onPress={onPress}>
          <Button style={styles.btnStyle} mode="contained">
            Modify
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditMonthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.89,
    justifyContent: 'space-evenly',
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
