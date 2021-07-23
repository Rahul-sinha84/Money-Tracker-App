import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import GoogleSignin from '../auth';
import {connect} from 'react-redux';
import {setLoginStatus, setUserData} from '../redux/actions';
import {bindActionCreators} from 'redux';

const WelcomeScreen = ({navigation, userData}) => {
  useEffect(() => {
    //when the user is logged in then passing the data to next screen
    if (
      !userData.isCreated &&
      userData.isLoggedIn &&
      userData.userInfo !== {}
    ) {
      navigation.navigate('CreateUserScreen');
    }
  }, [userData.isLoggedIn, userData.userInfo]);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/welcome-bg.jpg')}
        style={styles.image}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.titleUpper}>
              <Text style={styles.textUpper}>Experience the</Text>
            </View>
            <View style={styles.titleLower}>
              <Text style={styles.textLower}> Real-Money-Tracking</Text>
            </View>
          </View>
          <GoogleSignin />
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => ({
  userData: state.userAuthenticationStore,
});

const ActionCreators = Object.assign({
  setLoginStatus,
  setUserData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'space-between',
    marginTop: '60%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  titleUpper: {
    width: '60%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    borderTopEndRadius: 10,
  },
  titleLower: {
    borderTopEndRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textUpper: {
    color: 'white',
    fontSize: 30,
  },
  textLower: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
  },
  btnStyle: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#2998ff',
    width: '60%',
    borderRadius: 5,
    marginHorizontal: '20%',
    paddingVertical: 10,
  },
  btnContent: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
