import apiRequest from './axios';
import uuid4 from 'uuid4';

export const CHECKING_AUTHENTICATION = 'CHECKING_AUTHENTICATION';
export const AUTHENTICATED = 'AUTHENTICATED';
export const ERROR = 'ERROR';

export const checkAuthentication = (username, password) => async dispatch => {
    dispatch(actionCreator(CHECKING_AUTHENTICATION, null));

    //todo: Finish the get request to the backend and wait for response
    // apiRequest().get()

    setTimeout(() => {
        dispatch(actionCreator(AUTHENTICATED, uuid4));
    }, 1000);

    let error = new ERROR('Authentication Failed.');
    dispatch(actionCreator(ERROR, error));
};

const actionCreator = (type, payload) => ({
    type,
    payload,
});
