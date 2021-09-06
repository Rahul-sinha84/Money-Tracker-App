import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Heading from '../components/heading/blkAndclr';
import {connect} from 'react-redux';
import axios from '../axios/server';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
  setMongoId,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

const CreateUser = ({navigation, actions, userData}) => {
  const [loading, setLoading] = useState(true);
  const [userAvailable, setUserAvailable] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  useEffect(() => {
    (async () => {
      //should not post the previous value
      if (userData.userInfo.displayName) {
        const isPresent = await userAlreadyPresent(userData.userInfo.uid);
        setUserAvailable(isPresent);
        setLoading(false);
      }
    })();
  }, [userData]);
  const userAlreadyPresent = async uid => {
    const response = await axios.post('/', {
      query: `
        query{
          getUser(userId:"${uid}") {
            ...on User {
              userId
              _id
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
    return response.data.data.getUser ? true : false;
  };
  const userName = userData.userInfo.displayName;
  //we need to send the data to db in following function
  const submitUserValues = async () => {
    if (!cashPrice || !totalAmount)
      return Alert.alert('Please fill all the value !!');
    let user;
    if (!userAvailable) {
      const response = await axios.post('/', {
        query: `
        mutation {
          createUser(userId:"${userData.userInfo.uid}", cashPrice: ${cashPrice}, totalAmount:${totalAmount}) {
            ... on User {
              userId
              _id
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
      user = response.data.data.createUser;
    } else {
      const response = await axios.post('/', {
        query: `
          query{
            getUser(userId:"${userData.userInfo.uid}") {
              ...on User {
                userId
                _id
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
      user = response.data.data.getUser;
    }
    actions.setMongoId(user._id);
    actions.setIsCreated(true);
    if (userData.isCreated) {
      navigation.navigate('HomeScreen');
    }
  };
  const enterWallet = async () => {
    const response = await axios.post('/', {
      query: `
        query{
          getUser(userId:"${userData.userInfo.uid}") {
            ...on User {
              userId
              _id
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
    actions.setMongoId(user._id);
    actions.setIsCreated(true);
    if (userData.isCreated) {
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#000" />
        </>
      ) : userAvailable ? (
        <>
          <Text style={styles.textStyle}>Welcome again !!</Text>
          <Button
            onPress={enterWallet}
            style={styles.enterBtnStyle}
            mode="contained">
            Enter into your Wallet
          </Button>
        </>
      ) : (
        <>
          <View style={styles.container__upper}>
            <Heading color="#2998ff" blkMsg="Hello," clrMsg={userName} />
          </View>
          <View style={styles.container__lower}>
            <TextInput
              style={styles.textInp}
              label="Total Amount"
              underlineColor="lightblue"
              mode="outlined"
              value={totalAmount}
              onChangeText={text => setTotalAmount(text)}
              placeholder="Type here..."
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.textInp}
              label="Cash Price"
              mode="outlined"
              value={cashPrice}
              onChangeText={text => setCashPrice(text)}
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
        </>
      )}
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
  setMongoId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

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
  enterBtnStyle: {
    marginHorizontal: 10,
    padding: 5,
  },
});
