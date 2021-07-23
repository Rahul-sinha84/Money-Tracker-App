import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Card from '../components/Cards/CardBig';
import CardHorizontal from '../components/Cards/CardHorizontal';
import Background from './Background';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

const upperPartBig = () => (
  <Text style={styles.savingsText}>Savings: ₹5000</Text>
);
const lowerPartBig = () => (
  <>
    <View>
      <Text style={styles.mainText}>Total Amount: ₹6000</Text>
    </View>
    <View>
      <Text style={styles.mainText}>Expense: ₹1000</Text>
    </View>
  </>
);
const leftPartHorz = () => (
  <>
    <Icon name="cash" size={50} color={'#28b485'} />
    <Text style={styles.contentText}>Cash available:</Text>
  </>
);
const rightPartHorz = () => (
  <>
    <Text style={styles.contentText}>₹660</Text>
  </>
);

const content = () => (
  <View>
    <Card upper={upperPartBig} bottom={lowerPartBig()} />
    <CardHorizontal left={leftPartHorz} right={rightPartHorz} />
  </View>
);

const HomeScreen = ({actions, userData}) => {
  return <Background content={content()} />;
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
