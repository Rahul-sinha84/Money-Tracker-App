import {
  LOGGED_IN_STATUS,
  USER_INFO,
  SIGN_IN_METHOD,
  CREATED_STATUS,
  MONGO_ID,
} from './constants';

const initialAuthenticationState = {
  isLoggedIn: false,
  userInfo: {},
  mongoId: '',
  authenticationMethod: {},
  isCreated: false,
};

export const authenticationReducer = (
  state = initialAuthenticationState,
  action,
) => {
  switch (action.type) {
    case LOGGED_IN_STATUS: {
      return {...state, isLoggedIn: action.payload};
    }
    case USER_INFO: {
      return {...state, userInfo: action.payload};
    }
    case SIGN_IN_METHOD: {
      return {...state, authenticationMethod: action.payload};
    }
    case CREATED_STATUS: {
      return {...state, isCreated: action.payload};
    }
    case MONGO_ID: {
      return {...state, mongoId: action.payload};
    }
    default: {
      return state;
    }
  }
};
