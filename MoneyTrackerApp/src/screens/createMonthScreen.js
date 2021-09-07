import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Heading from '../components/heading/blkAndclr';
import {connect} from 'react-redux';
import axios from '../axios/server';

const CreateMonthScreen = ({navigation, userData}) => {
  const [curMonth, setCurMonth] = useState('');
  const [amt, setAmt] = useState(null);
  //have to send a post request of current date as well...
  const onSubmit = async () => {
    if (!curMonth || !amt) return Alert.alert('Please fill all the values !!');
    //creating month for the existing user
    const response = await axios.post('/', {
      query: `
        mutation{
          createMonth(user:"${
            userData.mongoId
          }", totalAmount: ${amt}, currentMonth: "${curMonth}", gotMoneyOn:"${new Date()}") {
          ...on MonthExp {
            _id
            totalAmount
            amountSpent
            amountSaved
            currentMonth
            currentAmount
            gotMoneyOn
          }
          ...on errMessage {
            msg
          }
        }
      }
      `,
    });
    const createdMonth = response.data.data.createMonth;
    if (createdMonth.msg) {
      const errMsg = createdMonth.msg;
      const duplicateCode = 'E11000';
      if (errMsg.includes(duplicateCode)) {
        return Alert.alert(
          'Already a month in your account, choose a diffrent month !!',
        );
      } else {
        return Alert.alert('Some error occured !!');
      }
    }
    if (createdMonth) {
      navigation.navigate('ExpenseScreen');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Heading clrMsg="New Month" blkMsg="Manage," color="#55c57a" />
      </View>
      <View>
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
        <TouchableOpacity onPress={onSubmit}>
          <Button style={styles.btnStyle} mode="contained">
            Create
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({userData: state.userAuthenticationStore});

export default connect(mapStateToProps)(CreateMonthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 0.89,
    justifyContent: 'space-evenly',
  },
  headingStyle: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'grey',
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
