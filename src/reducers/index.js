import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { accountReducer } from './accountReducer';
import { matchReducer } from './matchReducer';

export default combineReducers({
    appReducer,
    accountReducer,
    matchReducer,
});
