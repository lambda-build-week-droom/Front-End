import apiRequest from './axios';
import actionCreator from './actionCreator';
import uuid4 from 'uuid4';

export const CHECKING_AUTHENTICATION = 'CHECKING_AUTHENTICATION';
export const AUTHENTICATED = 'AUTHENTICATED';
export const ERROR = 'ERROR';
export const REGISTERED = 'REGISTERED';

let registered = [];

export const checkAuthentication = (username, password) => async dispatch => {
    dispatch(actionCreator(CHECKING_AUTHENTICATION));

    // todo: remove this because once backend is up then backend will validate the newly registered person.
    for (let i = 0; i < registered.length; i++) {
        if (
            registered[i].username === username &&
            registered[i].password === password
        ) {
            dispatch(actionCreator(AUTHENTICATED, uuid4()));
            return;
        }
    }

    // todo: remove this once backend is up
    if (username !== 'admin' || password !== 'admin') {
        let error = new Error('Authentication Failed.');
        dispatch(actionCreator(ERROR, error));
        return;
    }
    //todo: Finish the get request to the backend and wait for response
    // apiRequest().get()

    setTimeout(() => {
        dispatch(actionCreator(AUTHENTICATED, uuid4()));
    }, 1000);
};

export const submitRegistration = (username, password) => async dispatch => {
    if (username === '' || password === '') {
        let error = new Error('You must input a username and a password.');
        dispatch(actionCreator(ERROR, error));
        return;
    }

    registered.push({ username, password });
    //todo: Setup registration to backend.
    setTimeout(() => {
        dispatch(actionCreator(REGISTERED));
    }, 1000);
};
