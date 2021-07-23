import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import IconLogOut from 'react-native-vector-icons/MaterialIcons';

import {connect} from 'react-redux';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
  setIsCreated,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

const App = ({userData, actions}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '42728213424-vscviug28crfqrodgqg4rhs4d02rl3su.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    actions.setAuthenticationMethod(GoogleSignin);
    return subscriber; // unsubscribe on unmount
  }, []);
  function onAuthStateChanged(user) {
    setUserInfo(user);
    actions.setUserData(user);
  }
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken, accessToken} = await GoogleSignin.signIn();
      setLoggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      actions.setLoginStatus(true);
      // actions.setIsCreated(true);
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Please Sign in to continue !!');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
        alert('some error occured !!');
        console.log(error);
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
      actions.setLoginStatus(false);
      actions.setUserData({});
      setUserInfo({});
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View>
              {!loggedIn ? (
                <GoogleSigninButton
                  style={styles.googleBtnSignin}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={_signIn}
                />
              ) : null}
            </View>
            <View>
              {loggedIn && (
                <TouchableNativeFeedback onPress={signOut}>
                  <View style={styles.googleBtnSignOut}>
                    <IconLogOut size={40} color="white" name="logout" />

                    <Text style={{fontSize: 20, color: 'white'}}>Sign out</Text>
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  googleBtnSignin: {
    height: 55,
    width: 250,
    marginHorizontal: 70,
  },
  googleBtnSignOut: {
    marginHorizontal: 115,
    width: 175,
    paddingHorizontal: 25,
    height: 55,
    backgroundColor: 'red',
    fontSize: 25,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
