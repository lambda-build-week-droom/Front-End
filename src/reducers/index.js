import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { accountReducer } from './accountReducer';

export default combineReducers({
    appReducer,
    accountReducer,
});
