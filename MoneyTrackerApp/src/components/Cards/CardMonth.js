import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CreateButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import AddButton from '../buttons/AddButton';

const CardMonth = ({toNavigate, id = ''}) => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.containerUpper}>
        <Text style={styles.primaryText}>Got Money on: 06/03/2021</Text>
        <Text style={styles.primaryText}>Total Amount: ₹600</Text>
      </View>
      <View style={styles.containerMiddle}>
        <Text style={styles.headerText}>month</Text>
        <Text>Current Amount: ₹535</Text>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.primaryText}>Amount Saved: ₹535</Text>
        <Text style={styles.primaryText}>Amount Spent: ₹65</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CreateButton
          toNavigate={toNavigate}
          params={id}
          whereToNavigate="EditMonthScreen"
        />
        <AddButton
          toNavigate={toNavigate}
          params={id}
          whereToNavigate="CreateExpenseScreen"
          text="Expense"
        />
        <DeleteButton />
      </View>
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
});
