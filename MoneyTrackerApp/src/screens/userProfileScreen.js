import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import axios from '../axios/server';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
} from '../redux/actions';
import {bindActionCreators} from 'redux';
import {ActivityIndicator} from 'react-native-paper';

const UserProfileScreen = ({actions, userData, navigation}) => {
  let source = userData.userInfo.photoURL;
  let email = userData.userInfo.email;
  let name = userData.userInfo.displayName;
  const [totalMonths, setTotalMonths] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  const fetchData = async () => {
    await axios
      .post('/', {
        query: `
        query {
          getAllMonths(userId:"${userData.mongoId}") {
            ...on MonthExpArray {
              allMonths {
                _id
                currentMonth
                currentAmount
                amountSaved
                allExpenses
              }
            }
            ...on errMessage {
              msg
            }
          }
        }
      `,
      })
      .then(response => {
        if (response.data.data.getAllMonths.msg) {
          Alert('No such user exists, try after logging in again  !!');
          return signout();
        }
        const _totalMonths = response.data.data.getAllMonths.allMonths;
        setTotalMonths(_totalMonths.length);
        let count = 0;
        _totalMonths.forEach(val => {
          count += val.allExpenses.length;
        });
        setTotalExpenses(count);
        setLoading(false);
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        Alert.alert(
          'There is some error while fetching your info, try after logging in again !!',
        );
      });
  };
  const deleteAccount = async () => {
    //api call for deletion of account
    await axios
      .post('/', {
        query: `
        mutation {
          removeUser(_id:"${userData.mongoId}") {
            ...on User {
              userId
              cashPrice
              totalAmount
              expenses
            }
            ...on errMessage {
              msg
            }
          }
        }
      `,
      })
      .then(response => {
        if (response.data.data.removeUser.msg) {
          return Alert.alert('Something went wrong, Please try again later !!');
        }
        signout();
      });
  };
  const deleteBtnPress = () => {
    Alert.alert(
      'Delete Account?',
      'All the corresponding Expenses and Months will be deleted completely!!',
      [
        {
          text: 'Yes',
          onPress: deleteAccount,
        },
        {
          text: 'No',
        },
      ],
    );
  };
  const signout = async () => {
    //for signout
    await userData.authenticationMethod.revokeAccess();
    await userData.authenticationMethod.signOut();
    await actions.setLoginStatus(false);
    await actions.setUserData({});
    await actions.setIsCreated(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container__upper}>
        {loading ? (
          <ActivityIndicator style={styles.loading} color="#000" />
        ) : (
          <>
            <View style={styles.googleInfo}>
              <Image source={{uri: source}} style={styles.picture} />
              <Text style={styles.nameStyle}>{name}</Text>
              <Text style={styles.emailStyle}>{email}</Text>
            </View>
            <View style={styles.dbInfo}>
              <View style={styles.dbValues}>
                <Text style={styles.titleStyle}>Total Months</Text>
                <Text style={styles.nmbrStyle}>{totalMonths}</Text>
              </View>
              <View style={styles.dbValues}>
                <Text style={styles.titleStyle}>Total Expenses</Text>
                <Text style={styles.nmbrStyle}>{totalExpenses}</Text>
              </View>
            </View>
          </>
        )}
      </View>
      <View style={styles.container__lower}>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={deleteBtnPress}>
            <View style={[styles.btnStyle, styles.deleteAccnt]}>
              <Icon color="#eb2f64" name="delete" size={30} />
              <Text style={[styles.btnTxt, {color: '#eb2f64'}]}>
                DELETE ACCOUNT
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableNativeFeedback onPress={signout}>
            <View style={[styles.btnStyle, styles.signoutBtn]}>
              <Icon color="white" name="logout" size={30} />
              <Text style={styles.btnTxt}>SINGOUT</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container__upper: {
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 7,
    paddingTop: 60,
    paddingBottom: 25,
    height: 400,
  },
  container__lower: {
    flex: 1,
  },
  googleInfo: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 30,
  },
  dbInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  dbValues: {
    display: 'flex',
    alignItems: 'center',
    padding: 12,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#rgba(0,0,0,0.7)',
  },
  nmbrStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 200,
    marginBottom: 15,
  },
  emailStyle: {
    textAlign: 'center',
    color: '#1b1b1b',
    fontSize: 16,
  },
  nameStyle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1b1b1b',
  },
  btnStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    paddingVertical: 10,
  },
  signoutBtn: {
    backgroundColor: '#eb2f64',
    marginHorizontal: 110,
  },
  deleteAccnt: {
    borderColor: '#eb2f64',
    borderWidth: 3,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  btnContainer: {
    height: 250,
    marginVertical: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  loading: {
    marginVertical: 100,
  },
});
