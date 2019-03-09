import apiRequest from './axios';
import uuid4 from 'uuid4';

export const CHECKING_AUTHENTICATION = 'CHECKING_AUTHENTICATION';
export const AUTHENTICATED = 'AUTHENTICATED';
export const ERROR = 'ERROR';

export const checkAuthentication = (username, password) => async dispatch => {
    debugger;
    dispatch(actionCreator(CHECKING_AUTHENTICATION, null));

    if (username !== 'admin' || password !== 'admin') {
        let error = new Error('Authentication Failed.');
        dispatch(actionCreator(ERROR, error));
        return;
    }
    //todo: Finish the get request to the backend and wait for response
    // apiRequest().get()

    setTimeout(() => {
        dispatch(actionCreator(AUTHENTICATED, uuid4));
    }, 1000);
};

const actionCreator = (type, payload) => ({
    type,
    payload,
});
