import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Heading from '../components/heading/blkAndclr';
import DropDown from '../components/dropDown';
import InpText from '../components/TextInput';
import {Button} from 'react-native-paper';
const createExpenseScreen = () => {
  const totalExpenseTypes = ['credit', 'food & beverages', 'shopping'];
  const boolValues = [true, false];
  //these are dummy values it would be exchanged by the available months
  const allMonths = ['jan', 'feb'];
  const [expenseType, setExpenseType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState('');
  const [badChoice, setBadChoice] = useState(false);
  const [month, setMonth] = useState('');
  const [paidByCash, setPaidByCash] = useState(false);
  //send today's date at the time of creation
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading color="#ff7730b3" blkMsg="Manage," clrMsg="Expense" />
      </View>
      <View style={styles.container__lower}>
        <DropDown
          title="Select Month:"
          onSelection={setMonth}
          dropdownItems={allMonths}
        />
        <InpText mode="outlined" label="Title" onHandleChange={setTitle} />
        <InpText
          mode="outlined"
          label="Amount"
          onHandleChange={setAmount}
          keyboardType="decimal-pad"
        />
        <InpText label="Note" onHandleChange={setNote} mode="outlined" />
        <DropDown
          title="Set Expense Type:"
          onSelection={setExpenseType}
          dropdownItems={totalExpenseTypes}
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
        />
        <TouchableOpacity>
          <Button mode="contained" style={styles.btnStyle}>
            Submit
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default createExpenseScreen;

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
});
