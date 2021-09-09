import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CardBig from '../components/Cards/CardBig';
import CardHorizontal from '../components/Cards/CardHorizontal';
import AddButton from '../components/buttons/AddButton';
import Background from './Background';
import axios from '../axios/server';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

const upperPart = () => (
  <>
    <Text style={styles.mainText}>All Monthly Expenses</Text>
  </>
);
const lowerPart = navigation => {
  return (
    <>
      <AddButton
        whereToNavigate="CreateMonthScreen"
        toNavigate={navigation}
        text="Month"
      />
    </>
  );
};

const leftPartHorz = (name = '') => (
  <>
    <Text style={styles.monthText}>{name}</Text>
  </>
);
const rightPartHorz = (mnyAvailable = null, mnysaved = null) => (
  <>
    <View>
      <Text style={styles.monthVals}>Money available: ₹{mnyAvailable}</Text>
      <Text style={styles.monthVals}>Money saved: ₹{mnysaved}</Text>
    </View>
  </>
);

const ExpenseScreen = ({navigation, userData}) => {
  const [monthValues, setMonthValues] = useState(null);

  const fetchData = async () => {
    const response = await axios.post('/', {
      query: `
      query {
        getAllMonths(userId:"${userData.mongoId}") {
          ...on MonthExpArray {
            allMonths {
              _id
              currentMonth
              currentAmount
              amountSaved
            }
          }
          ...on errMessage {
            msg
          }
        }
      }
        `,
    });
    const data = response.data.data.getAllMonths;
    if (data.allMonths) {
      const filteredData = data.allMonths.filter(val => val !== null).reverse();
      allCards(filteredData);
    }
  };
  useEffect(() => {
    //for fetching from db whenever app redirects to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  const allCards = data => {
    const arr = data.map(val => (
      <CardHorizontal
        key={val._id}
        toNavigate={navigation}
        id={val._id}
        whereToNavigate="MonthScreen"
        left={leftPartHorz(val.currentMonth)}
        right={rightPartHorz(val.currentAmount, val.amountSaved)}
      />
    ));
    setMonthValues(arr);
  };
  const content = () => {
    return (
      <SafeAreaView style={styles.bodyContainer}>
        <CardBig upper={upperPart} bottom={lowerPart(navigation)} />
        <View style={styles.viewContainer}>
          <ScrollView style={styles.scrollContainer}>
            {monthValues === null ? (
              <ActivityIndicator color="#000" />
            ) : !monthValues.length ? (
              <Text style={styles.loading}>No Months added so far...</Text>
            ) : (
              monthValues
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  return <Background content={content()} />;
};

const mapStateToProps = state => ({userData: state.userAuthenticationStore});
export default connect(mapStateToProps)(ExpenseScreen);

const styles = StyleSheet.create({
  bodyContainer: {},
  viewContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    height: 540,
    paddingVertical: 10,
    backgroundColor: '#f6f6f6',
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#999',
  },
  scrollContainer: {
    marginBottom: 30,
  },
  monthText: {
    fontSize: 17,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#777',
  },
  monthVals: {
    fontSize: 14,
  },
  loading: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
