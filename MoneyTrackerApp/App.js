import 'react-native-gesture-handler';
import React from 'react';
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
import EditExpenseScreen from './src/screens/EditExpenseScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        var iconName;
        if (route.name === 'HomeScreen') {
          iconName = 'home';
        } else if (route.name === 'ofMonthlyExpenses') {
          iconName = 'wallet';
        } else {
          iconName = 'account-box';
        }
        return (
          <Icon
            name={iconName}
            size={30}
            style={{marginTop: 8}}
            color={focused ? '#000' : '#999'}
          />
        );
      },
    })}>
    <Tabs.Screen
      options={{title: ''}}
      name="HomeScreen"
      component={HomeScreen}
    />
    <Tabs.Screen
      options={{title: ''}}
      name="ofMonthlyExpenses"
      component={ofMonthlyExpenses}
    />
    <Tabs.Screen
      options={{title: ''}}
      name="UserProfileScreen"
      component={UserProfileScreen}
    />
  </Tabs.Navigator>
);

const App = ({userData}) => {
  return (
    <NavigationContainer>
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

export default connect(mapStateToProps)(App);
