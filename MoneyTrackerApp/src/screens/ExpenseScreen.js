import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardBig from '../components/Cards/CardBig';
import CardHorizontal from '../components/Cards/CardHorizontal';
import AddButton from '../components/buttons/AddButton';
import Background from './Background';

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

const content = navigation => {
  return (
    <SafeAreaView style={styles.bodyContainer}>
      <CardBig upper={upperPart} bottom={lowerPart(navigation)} />
      <View style={styles.viewContainer}>
        <ScrollView style={styles.scrollContainer}>
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
          <CardHorizontal
            toNavigate={navigation}
            whereToNavigate="MonthScreen"
            left={leftPartHorz}
            right={rightPartHorz}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const leftPartHorz = () => (
  <>
    <Text style={styles.monthText}>Month</Text>
  </>
);
const rightPartHorz = () => (
  <>
    <View>
      <Text style={styles.monthVals}>Money available: ₹400</Text>
      <Text style={styles.monthVals}>Money saved: ₹500</Text>
    </View>
  </>
);

const ExpenseScreen = ({navigation}) => {
  return <Background content={content(navigation)} />;
};

export default ExpenseScreen;

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
});
