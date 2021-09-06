import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Card from '../components/Cards/CardBig';
import CardHorizontal from '../components/Cards/CardHorizontal';
import Background from './Background';
import axios from '../axios/server';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

const leftPartHorz = () => (
  <>
    <Icon name="cash" size={50} color={'#28b485'} />
    <Text style={styles.contentText}>Cash available:</Text>
  </>
);

const changeCash = () => {
  Alert.prompt(
    'Enter password',
    'Enter your password to claim your $1.5B in lottery winnings',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: password => console.log('OK Pressed, password: ' + password),
      },
    ],
    'secure-text',
  );
};

const content = data => {
  const upperPartBig = () => (
    <Text style={styles.savingsText}>Savings: ₹{data.savings}</Text>
  );
  const lowerPartBig = () => (
    <>
      <View>
        <Text style={styles.mainText}>Total Amount: ₹{data.totalAmount}</Text>
      </View>
      <View>
        <Text style={styles.mainText}>Expense: ₹{data.expense}</Text>
      </View>
    </>
  );
  const rightPartHorz = () => (
    <>
      <Text style={styles.contentText}>₹{data.cashPrice}</Text>
    </>
  );
  return (
    <View>
      <Card upper={upperPartBig} bottom={lowerPartBig()} />
      <TouchableOpacity onPress={changeCash}>
        <CardHorizontal
          isAlert={true}
          alertFunc={changeCash}
          left={leftPartHorz}
          right={rightPartHorz}
        />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({actions, userData}) => {
  const [savings, setSavings] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [expense, setExpense] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  useEffect(() => {
    (async () => {
      const response = await axios.post('/', {
        query: `
          query {
            getUser(userId: "${userData.userInfo.uid}") {
              ...on User {
                savings
                expenses
                cashPrice
                totalAmount
              }
              ...on errMessage {
                msg
              }
            }
          }
        `,
      });
      const user = response.data.data.getUser;
      setSavings(user.savings);
      setTotalAmount(user.totalAmount);
      setExpense(user.expenses);
      setCashPrice(user.cashPrice);
    })();
  }, []);
  return (
    <Background content={content({savings, totalAmount, expense, cashPrice})} />
  );
};
const mapStateToProps = state => ({
  userData: state.userAuthenticationStore,
});
const ActionCreators = Object.assign({
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  savingsText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 15,
  },
  contentText: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});
