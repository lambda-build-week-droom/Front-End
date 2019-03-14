import { request, requestWithToken } from './axios';
import actionCreator from './actionCreator';
import { LOGGED_IN } from './accountActions';
import { decrypt, encrypt } from '../components/Cryptr';

export const CHECKING_AUTHENTICATION = 'CHECKING_AUTHENTICATION';
export const AUTHENTICATED = 'AUTHENTICATED';
export const ERROR = 'ERROR';
export const REGISTERED = 'REGISTERED';
export const AUTHENTICATED_FROM_LOCAL_STORAGE =
    'AUTHENTICATED_FROM_LOCAL_STORAGE';

let registered = [];

export const checkAuthentication = account => async dispatch => {
    dispatch(actionCreator(CHECKING_AUTHENTICATION));

    request()
        .post('/auth/login', {
            email: account.email,
            password: account.password,
        })
        .then(res => {
            if (account.rememberMe) {
                let key = encrypt('token');
                let tokenValue = encrypt(res.data.token);
                localStorage.setItem(key, tokenValue);
                let account = encrypt(JSON.stringify(res.data.userInfo));
                let accountKey = encrypt('account');
                localStorage.setItem(accountKey, account);
            }
            dispatch(actionCreator(AUTHENTICATED, res.data.token));
            dispatch(actionCreator(LOGGED_IN, res.data.userInfo));
        })
        .catch(err => {
            dispatch(actionCreator(ERROR, err));
        });
};

export const submitRegistration = account => async dispatch => {
    if (account.type === 'company') {
        debugger;
        request()
            .post('/auth/register', {
                email: account.email,
                password: account.password,
                type: account.type,
                companyName: account.companyName,
            })
            .then(res => {
                dispatch(actionCreator(REGISTERED));
            })
            .catch(err => {
                dispatch(actionCreator(ERROR, err));
            });
        return;
    }
    request()
        .post('/auth/register', {
            email: account.email,
            password: account.password,
            type: account.type,
        })
        .then(res => {
            dispatch(actionCreator(REGISTERED));
        })
        .catch(err => {
            dispatch(actionCreator(ERROR, err));
        });
};

export const authenticateFromLocalStorage = token => ({
    type: AUTHENTICATED_FROM_LOCAL_STORAGE,
    payload: token,
});
