import {
  LOGGED_IN_STATUS,
  USER_INFO,
  SIGN_IN_METHOD,
  CREATED_STATUS,
} from './constants';

export const setLoginStatus = data => ({
  type: LOGGED_IN_STATUS,
  payload: data,
});

export const setUserData = data => ({
  type: USER_INFO,
  payload: data,
});

export const setAuthenticationMethod = data => ({
  type: SIGN_IN_METHOD,
  payload: data,
});

export const setIsCreated = data => ({
  type: CREATED_STATUS,
  payload: data,
});
