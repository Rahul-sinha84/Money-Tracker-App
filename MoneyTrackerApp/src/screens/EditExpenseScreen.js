import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Heading from '../components/heading/blkAndclr';
import DropDown from '../components/dropDown';
import InpText from '../components/TextInput';
import {Button} from 'react-native-paper';
import DatePicker from '../components/months/setDateAndTime';
const EditExpenseScreen = () => {
  const boolValues = [true, false];
  const [expenseType, setExpenseType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState('');
  const [badChoice, setBadChoice] = useState(false);
  const [month, setMonth] = useState('');
  const [paidByCash, setPaidByCash] = useState(false);
  const [gotMoneyOn, setGotMoneyOn] = useState(new Date());
  console.log(gotMoneyOn);
  //send today's date at the time of creation
  //data will be filled in useEffect
  useEffect(() => {
    setExpenseType('prefetched value');
    setTitle('prefetched value');
    //initialize amount to be in string
    setAmount('45');
    setNote('prefetched value');
    setBadChoice(true);
    setMonth('prefetched value');
    setPaidByCash(true);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading color="#ff7730b3" blkMsg="Edit," clrMsg="Expense" />
      </View>
      <View style={styles.container__lower}>
        <DropDown
          title="Select Month:"
          onSelection={setMonth}
          isDisabled={true}
          disabledValue={month}
        />
        <InpText
          initialValue={title}
          mode="outlined"
          label="Title"
          onHandleChange={setTitle}
        />
        <InpText
          initialValue={amount}
          mode="outlined"
          label="Amount"
          onHandleChange={setAmount}
          isDisabled={true}
          keyboardType="decimal-pad"
        />
        <InpText
          initialValue={note}
          label="Note"
          onHandleChange={setNote}
          mode="outlined"
        />
        <DropDown
          title="Set Expense Type:"
          onSelection={setExpenseType}
          isDisabled={true}
          disabledValue={expenseType}
        />
        <DropDown
          title="Is it a Bad Choice ?"
          onSelection={setBadChoice}
          dropdownItems={boolValues}
        />
        <DropDown
          title="Paid by Cash ?"
          onSelection={setPaidByCash}
          dropdownItems={boolValues}
          isDisabled={true}
          disabledValue={`${paidByCash}`}
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
          <Button mode="contained" style={styles.btnStyle}>
            Submit
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditExpenseScreen;

const styles = StyleSheet.create({
  container: {},
  container__upper: {
    marginVertical: 40,
  },
  container__lower: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 15,
  },
  btnStyle: {
    marginHorizontal: 145,
    paddingVertical: 4,
    marginVertical: 20,
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
