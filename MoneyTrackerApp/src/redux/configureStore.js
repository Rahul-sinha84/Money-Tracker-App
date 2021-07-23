import {combineReducers, createStore} from 'redux';
import {authenticationReducer} from './reducers';

const rootReducer = combineReducers({
  userAuthenticationStore: authenticationReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
