import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from '../components/heading/blkAndclr';
import DropDown from '../components/dropDown';
import InpText from '../components/TextInput';
import {Button} from 'react-native-paper';
import axios from '../axios/server';

const CreateExpenseScreen = ({navigation, route}) => {
  const totalExpenseTypes = ['credit', 'food & beverages', 'shopping'];
  const boolValues = [true, false];
  const [expenseType, setExpenseType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState('');
  const [badChoice, setBadChoice] = useState('');
  const [monthId, setMonthId] = useState('');
  const [paidByCash, setPaidByCash] = useState('');
  //send today's date at the time of creation

  useEffect(() => {
    let {id} = route.params;
    setMonthId(id);
  }, []);
  const onPress = async () => {
    if (
      !expenseType ||
      !title ||
      !amount ||
      !note ||
      !monthId ||
      badChoice === '' ||
      paidByCash === ''
    ) {
      return Alert.alert('Please fill all the required fields !!');
    }
    await axios
      .post('/', {
        query: `
        mutation {
        createExpense(
          title:"${title}"
          Note:"${note}",
          expType:"${expenseType}",
          amount:${amount},
          badChoice: ${badChoice},
          month: "${monthId}",
          paidByCash: ${paidByCash}
          dateOfPurchase: "${new Date()}"
          ) {
            ...on Expenses {
              _id
              title
              amount
              expType
              badChoice
            }
            ...on errMessage {
              msg
            }
          }
        }
      `,
      })
      .then(res => {
        navigation.navigate('MonthScreen');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Some error occured, Please try again later !!');
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading color="#ff7730b3" blkMsg="Manage," clrMsg="Expense" />
      </View>
      <View style={styles.container__lower}>
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
        <TouchableOpacity onPress={onPress}>
          <Button mode="contained" style={styles.btnStyle}>
            Submit
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateExpenseScreen;

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
