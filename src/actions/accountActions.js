import apiRequest, { requestWithToken } from './axios';
import actionCreator from './actionCreator';
import uuid4 from 'uuid4';

export const UPDATING_ACCOUNT_INFO = 'UPDATING_ACCOUNT_INFO';
export const ACCOUNT_INFORMATION_UPDATED = 'ACCOUNT_INFORMATION_UPDATED';
export const ERROR = 'ERROR';
export const REGISTERED = 'REGISTERED';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

let registered = [];

export const updateAccountInfo = (
    account,
    token,
    accountType
) => async dispatch => {
    dispatch(actionCreator(UPDATING_ACCOUNT_INFO));

    //debugger;
    let url = `/users/update`;
    if (accountType === 'company') {
        url = `/companies/update`;
    } else if (accountType === 'job') {
        url = `/jobs/update/${account.id}`;
    }

    requestWithToken(token)
        .put(url, { ...account })
        .then(res => {
            //debugger;
            dispatch(actionCreator(ACCOUNT_INFORMATION_UPDATED, account));
        })
        .catch(err => {
            //debugger;
            dispatch(actionCreator(ERROR, err));
        });
};

export const logOut = () => {
    return actionCreator(LOGGED_OUT);
};

export const loggedIn = account => {
    return {
        type: LOGGED_IN,
        payload: account,
    };
};
