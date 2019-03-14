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

    this.props;
    let url = `/users/update`;
    if (accountType === 'company') {
        url = `/companies/update`;
    } else if (accountType === 'job') {
        url = `/jobs/update/${account.id}`;
    }

    if (accountType === 'user') {
        requestWithToken(token)
            .put(url, {
                firstName: account.firstName,
                lastName: account.lastName,
                occupation: account.occupation,
                experience: account.experience,
                interests: account.interests,
            })
            .then(res => {
                this.props;
                dispatch(actionCreator(ACCOUNT_INFORMATION_UPDATED, account));
            })
            .catch(err => {
                this.props;
                dispatch(actionCreator(ERROR, err));
            });
    } else if (accountType === 'company') {
        requestWithToken(token)
            .put(url, {
                companyName: account.companyName,
                email: account.email,
                bio: account.bio,
                address: account.address,
            })
            .then(res => {
                this.props;
                dispatch(actionCreator(ACCOUNT_INFORMATION_UPDATED, account));
            })
            .catch(err => {
                this.props;
                dispatch(actionCreator(ERROR, err));
            });
    }
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
