import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import CardMonth from '../components/Cards/CardMonth';
import ExpenseCard from '../components/Cards/ExpenseCard';
import axios from '../axios/server';
import {ActivityIndicator} from 'react-native-paper';

const MonthScreen = ({navigation, route}) => {
  const [monthId, setMonthId] = useState('');
  const [allExpenses, setAllExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthInfo, setMonthInfo] = useState({});
  useEffect(() => {
    const {id} = route.params;
    setMonthId(id);
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(id);
    });
    return unsubscribe;
  }, []);

  const fetchData = async id => {
    const response = await axios.post('/', {
      query: `
        query {
          getAllExpenses(monthId: "${id}") {
            ...on ExpensesArray {
              allExpenses {
                _id
                title
                expType
                amount
                dateOfPurchase
                Note
                badChoice
                paidByCash
              }
            }
            ...on errMessage {
              msg
            }
          }
          getMonthById(monthId: "${id}") {
            ... on MonthExp {
              _id
              currentMonth
              currentAmount
              gotMoneyOn
              totalAmount
              amountSaved
              amountSpent
            }
            ...on errMessage {
              msg
            }
          }
        }
      `,
    });
    const _monthinfo = response.data.data.getMonthById;
    setMonthInfo(_monthinfo);

    const data = response.data.data.getAllExpenses.allExpenses;

    const expenses = data
      .map(val => (
        <ExpenseCard
          key={val._id}
          title={val.title}
          expType={val.expType}
          amount={val.amount}
          data={val}
          whereToNavigate="editExpenseScreen"
          toNavigate={navigation}
        />
      ))
      .reverse();
    setAllExpenses(expenses);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.displayCard}>
        <CardMonth monthInfo={monthInfo} id={monthId} toNavigate={navigation} />
      </View>
      <View style={styles.expenseContent}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : !allExpenses.length ? (
          <Text style={styles.noExpensesMsg}>No expenses this month !!</Text>
        ) : (
          <ScrollView style={styles.scrollContainer}>{allExpenses}</ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MonthScreen;

const styles = StyleSheet.create({
  displayCard: {
    marginTop: 30,
  },
  parent: {
    backgroundColor: '#eee',
    flex: 1,
  },
  expenseContent: {
    marginTop: 50,
    backgroundColor: '#f6f6f6',
    height: 510,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  scrollContainer: {
    marginBottom: 30,
  },
  noExpensesMsg: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
