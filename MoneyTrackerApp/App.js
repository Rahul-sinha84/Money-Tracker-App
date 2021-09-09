import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ExpenseScreen from './src/screens/ExpenseScreen';
import MonthScreen from './src/screens/MonthScreen';
import CreateUserScreen from './src/screens/createUserScreen';
import CreateMonthScreen from './src/screens/createMonthScreen';
import EditMonthScreen from './src/screens/editMonthScreen';
import CreateExpenseScreen from './src/screens/createExpenseScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import UserProfileScreen from './src/screens/userProfileScreen';
import {connect} from 'react-redux';
import {
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
} from './src/redux/actions';
import EditExpenseScreen from './src/screens/EditExpenseScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const ofMonthlyExpenses = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} />
    <Stack.Screen name="CreateMonthScreen" component={CreateMonthScreen} />
    <Stack.Screen name="MonthScreen" component={MonthScreen} />
    <Stack.Screen name="CreateExpenseScreen" component={CreateExpenseScreen} />
    <Stack.Screen name="EditMonthScreen" component={EditMonthScreen} />
    <Stack.Screen name="editExpenseScreen" component={EditExpenseScreen} />
  </Stack.Navigator>
);

const afterLogin = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="HomeScreen" component={HomeScreen} />
    <Tabs.Screen name="ofMonthlyExpenses" component={ofMonthlyExpenses} />
    <Tabs.Screen name="UserProfileScreen" component={UserProfileScreen} />
    {/* <Tabs.Screen name="CreateUserScreen" component={CreateUserScreen} /> */}
    {/* <Tabs.Screen name="CreateMonthScreen" component={CreateMonthScreen} />
    <Tabs.Screen name="EditMonthScreen" component={EditMonthScreen} />
    <Tabs.Screen name="CreateExpenseScreen" component={CreateExpenseScreen} /> */}
  </Tabs.Navigator>
);

const App = ({userData}) => {
  return (
    <NavigationContainer>
      {/* <Tabs.Navigator>
        <Tabs.Screen name="HomeScreen" component={HomeScreen} />
        <Tabs.Screen name="ExpenseScreen" component={ExpenseScreen} />
        <Tabs.Screen name="MonthScreen" component={MonthScreen} />
        <Tabs.Screen name="CreateUserScreen" component={CreateUserScreen} />
        <Tabs.Screen name="CreateMonthScreen" component={CreateMonthScreen} />
        <Tabs.Screen name="EditMonthScreen" component={EditMonthScreen} />
        <Tabs.Screen
          name="CreateExpenseScreen"
          component={CreateExpenseScreen}
        />
        <Tabs.Screen name="Welcome" component={WelcomeScreen} />
      </Tabs.Navigator> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userData.isCreated && userData.isLoggedIn ? (
          <Stack.Screen
            options={{
              title: 'My App',
            }}
            name="HomeScreen"
            component={afterLogin}
          />
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen
              name="CreateUserScreen"
              component={CreateUserScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  userData: state.userAuthenticationStore,
});
const ActionCreators = Object.assign({
  setLoginStatus,
  setUserData,
  setAuthenticationMethod,
});

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({});
