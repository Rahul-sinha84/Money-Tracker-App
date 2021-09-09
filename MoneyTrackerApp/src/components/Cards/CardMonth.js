import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CreateButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import AddButton from '../buttons/AddButton';
import {ActivityIndicator} from 'react-native-paper';

const CardMonth = ({toNavigate, id = '', monthInfo}) => {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (monthInfo.gotMoneyOn) {
      let reterivedDate = new Date(monthInfo.gotMoneyOn);
      const _date = reterivedDate.getDate();
      const _month = reterivedDate.getMonth() + 1;
      const _year = reterivedDate.getFullYear();
      const finalDate = `${_date}/${_month}/${_year}`;
      setDate(finalDate);
      setLoading(false);
    }
  }, [monthInfo]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      {loading ? (
        <ActivityIndicator style={styles.loading} color="#000" />
      ) : (
        <>
          <View style={styles.containerUpper}>
            <Text style={styles.primaryText}>Got Money on: {date}</Text>
            <Text style={styles.primaryText}>
              Total Amount: ₹{monthInfo.totalAmount}
            </Text>
          </View>
          <View style={styles.containerMiddle}>
            <Text style={styles.headerText}>{monthInfo.currentMonth}</Text>
            <Text>Current Amount: ₹{monthInfo.currentAmount}</Text>
          </View>
          <View style={styles.containerBottom}>
            <Text style={styles.primaryText}>
              Amount Saved: ₹{monthInfo.amountSaved}
            </Text>
            <Text style={styles.primaryText}>
              Amount Spent: ₹{monthInfo.amountSpent}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CreateButton
              toNavigate={toNavigate}
              params={monthInfo}
              whereToNavigate="EditMonthScreen"
            />
            <AddButton
              toNavigate={toNavigate}
              params={id}
              whereToNavigate="CreateExpenseScreen"
              text="Expense"
            />
            <DeleteButton
              id={id}
              toNavigate={toNavigate}
              whereToNavigate="ExpenseScreen"
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CardMonth;

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 7,
    paddingBottom: 30,
    borderColor: '#ff762f',
    borderWidth: 1.5,
    height: 225,
  },
  containerUpper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  containerMiddle: {
    padding: 15,
    alignItems: 'center',
  },
  containerBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  primaryText: {
    fontSize: 15,
  },
  headerText: {
    fontSize: 30,
    color: '#999',
    fontWeight: 'bold',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: -25,
  },
  loading: {
    marginVertical: 105,
  },
});
