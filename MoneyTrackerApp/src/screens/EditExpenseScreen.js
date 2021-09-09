import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import Heading from '../components/heading/blkAndclr';
import DropDown from '../components/dropDown';
import InpText from '../components/TextInput';
import axios from '../axios/server';
import {ActivityIndicator, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from '../components/months/setDateAndTime';

const EditExpenseScreen = ({navigation, route}) => {
  const boolValues = [true, false];
  const [expenseType, setExpenseType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [badChoice, setBadChoice] = useState('');
  const [paidByCash, setPaidByCash] = useState(false);
  const [gotMoneyOn, setGotMoneyOn] = useState(new Date());
  //send today's date at the time of creation
  //data will be filled in useEffect
  const deleteExpense = async () => {
    await axios
      .post('/', {
        query: `
        mutation {
          removeExpense(_id:"${route.params.data._id}") {
            ...on Expenses {
              _id
              title
              Note
              month
            }
            ...on errMessage {
              msg
            }
          }
        }
      `,
      })
      .then(response => {
        if (response.data.data.msg) {
          return Alert.alert('Something went wrong, please try again later !!');
        }
        navigation.navigate('MonthScreen');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Something went wrong, please try again later !!');
      });
  };
  const deleteAlert = () => {
    Alert.alert('Delete Expense?', '', [
      {
        text: 'Yes',
        onPress: deleteExpense,
      },
      {
        text: 'No',
      },
    ]);
  };
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerShown: true,
        headerTitle: '',
        headerRight: () => (
          <TouchableOpacity onPress={deleteAlert}>
            <Icon
              name="delete"
              style={{marginRight: 10}}
              color={'#eb2f64'}
              size={35}
            />
          </TouchableOpacity>
        ),
      });
    }
    const {data} = route.params;
    if (data) {
      setExpenseType(data.expType);
      setTitle(data.title);
      //initialize amount to be in string
      setAmount(String(data.amount));
      setNote(data.Note);
      setBadChoice(data.badChoice);
      setPaidByCash(data.paidByCash);
      const _date = new Date(data.dateOfPurchase);
      setGotMoneyOn(_date);
      setLoading(false);
    }
  }, [route]);
  const onPress = async () => {
    if (!title || !note) {
      return Alert.alert("Please don't left any text field blank !!");
    }
    await axios
      .post('/', {
        query: `
        mutation {
          editExpense(
            _id: "${route.params.data._id}",
            title: "${title}",
            Note: "${note}",
            badChoice: ${badChoice},
            dateOfPurchase: "${gotMoneyOn}"
          ) {
            ...on Expenses {
              _id
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
    <ScrollView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading color="#ff7730b3" blkMsg="Edit," clrMsg="Expense" />
      </View>
      <View style={styles.container__lower}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <>
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
            <TouchableOpacity onPress={onPress}>
              <Button mode="contained" style={styles.btnStyle}>
                Submit
              </Button>
            </TouchableOpacity>
          </>
        )}
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
    height: 800,
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
    color: '#000',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
