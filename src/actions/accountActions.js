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

export const updateAccountInfo = (account, token) => async dispatch => {
    dispatch(actionCreator(UPDATING_ACCOUNT_INFO));
    let url = `/users/update/${account.id}`;
    let data = {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        occupation: account.occupation,
        experience: account.experience,
        interests: account.interests,
    };

    if (account.hasOwnProperty('jobTitle')) {
        url = `/jobs/update/${account.id}`;

        data = {
            id: 1,
            jobTitle: account.jobTitle,
            jobPosition: account.jobPosition,
            jobDescription: account.jobDescription,
            jobRequirements: account.jobRequirements,
            jobSalary: account.jobSalary,
            jobTags: account.jobTags,
            jobOpenDate: account.jobOpenDate,
            jobCloseDate: account.jobCloseDate,
            company_id: account.company_id,
            jobImage: account.image,
        };
    } else if (account.hasOwnProperty('companyName')) {
        url = `/companies/update/${account.id}`;

        data = {
            id: account.id,
            companyName: account.companyName,
            email: account.email,
            bio: account.bio,
            address: account.address,
        };
    }
    requestWithToken(token)
        .put(url, { ...data })
        .then(res => {
            dispatch(actionCreator(ACCOUNT_INFORMATION_UPDATED, res.data));
        })
        .catch(err => {
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
