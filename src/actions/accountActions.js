import apiRequest from './axios';
import actionCreator from './actionCreator';
import uuid4 from 'uuid4';

export const UPDATING_ACCOUNT_INFO = 'UPDATING_ACCOUNT_INFO';
export const ACCOUNT_INFORMATION_UPDATED = 'ACCOUNT_INFORMATION_UPDATED';
export const ERROR = 'ERROR';
export const REGISTERED = 'REGISTERED';

let registered = [];

export const updateAccountInfo = account => async dispatch => {
    dispatch(actionCreator(UPDATING_ACCOUNT_INFO));

    //TODO: create axios request to backend submitting user data to backend.
    //TODO: set up error action for if something goes wrong with backend api.

    //TODO: set user information to user data returned from database.
    setTimeout(() => {
        debugger;
        let account = { ...account };
        dispatch(actionCreator(ACCOUNT_INFORMATION_UPDATED, account));
    }, 1000);
};
