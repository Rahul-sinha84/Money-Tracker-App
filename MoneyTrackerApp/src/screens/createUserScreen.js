import React from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Heading from '../components/heading/blkAndclr';
import {connect} from 'react-redux';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

const createUser = ({navigation, actions, userData}) => {
  const userName = userData.userInfo.displayName;
  //we need to send the data to db in following function
  const submitUserValues = () => {
    actions.setIsCreated(true);
    if (userData.isCreated) {
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__upper}>
        <Heading color="#2998ff" blkMsg="Hello," clrMsg={userName} />
      </View>
      <View style={styles.container__lower}>
        <TextInput
          style={styles.textInp}
          label="Total Amount"
          underlineColor="lightblue"
          mode="outlined"
          placeholder="Type here..."
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.textInp}
          label="Cash Price"
          mode="outlined"
          placeholder="Type here..."
          keyboardType="numeric"
        />
        <TouchableOpacity>
          <Button
            onPress={submitUserValues}
            style={styles.btnStyle}
            mode="contained">
            Submit
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(createUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  container__upper: {},
  container__lower: {
    paddingVertical: 70,
  },
  textInp: {
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#f7f7f7',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  btnStyle: {
    marginHorizontal: 140,
    padding: 5,
  },
});
