import React from 'react';
import {
  ScrollView,
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
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

const userProfileScreen = ({actions, userData}) => {
  let source = userData.userInfo.photoURL;
  let email = userData.userInfo.email;
  let name = userData.userInfo.displayName;
  const deleteAccount = () => {
    //api call for deletion of account
    console.log('account has been deleted !!');
  };
  const deleteBtnPress = () => {
    Alert.alert(
      'Delete Account?',
      'All the corresponding Expenses and Months will be deleted !!',
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
        <View style={styles.googleInfo}>
          <Image source={{uri: source}} style={styles.picture} />
          <Text style={styles.nameStyle}>{name}</Text>
          <Text style={styles.emailStyle}>{email}</Text>
        </View>
        <View style={styles.dbInfo}>
          <View style={styles.dbValues}>
            <Text style={styles.titleStyle}>Total Months</Text>
            <Text style={styles.nmbrStyle}>2</Text>
          </View>
          <View style={styles.dbValues}>
            <Text style={styles.titleStyle}>Total Expenses</Text>
            <Text style={styles.nmbrStyle}>20</Text>
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(userProfileScreen);

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
    // backgroundColor: 'black',
    height: 250,
    marginVertical: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
