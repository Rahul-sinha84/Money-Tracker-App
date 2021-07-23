import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CardMonth from '../components/Cards/CardMonth';
import ExpenseCard from '../components/Cards/ExpenseCard';
const MonthScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.displayCard}>
        <CardMonth toNavigate={navigation} />
      </View>
      <View style={styles.expenseContent}>
        <ScrollView style={styles.scrollContainer}>
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
          <ExpenseCard />
        </ScrollView>
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
});
