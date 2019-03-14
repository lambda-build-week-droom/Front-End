import { requestWithToken } from './axios';
import actionCreator from './actionCreator';
import faker from 'faker';
import unsplash from './unsplash';

export const APPROVE_MATCH = 'APPROVE_MATCH';
export const MATCHES_FETCHED = 'MATCHES_FETCHED';
export const MATCH_ERROR = 'MATCH_ERROR';
export const DISAPPROVE_MATCH = 'DISAPPROVE_MATCH';
export const FETCHED_CURRENT_MATCHES = 'FETCHED_CURRENT_MATCHES';
export const CURRENT_MATCHES_ERROR = 'CURRENT_MATCHES_ERROR';

export const getPictures = async dispatch => {};

export const approveMatch = accountId => async dispatch => {
    //TODO: tie in to backend to communicate matches.
    dispatch(actionCreator(APPROVE_MATCH, accountId));
    //TODO: send error to reducer is something goes wrong.
};

export const getStream = (token, accountType) => async dispatch => {
    this.props
    let url = '/jobs';
    if (accountType === 'company') {
        url = '/users';
    }

    requestWithToken(token)
        .get(url)
        .then(res => {
            let profileType = 'job';
            if (accountType === 'company') {
                profileType = 'user';
            }
            res.data = res.data.map(account => {
                account.accountType = profileType;
                return account;
            });
            dispatch(actionCreator(MATCHES_FETCHED, res.data));
        })
        .catch(err => {
            dispatch(actionCreator(MATCH_ERROR, err));
        });
};

export const disApproveMatch = accountId => async dispatch => {
    //TODO: send disapproval to backend.

    dispatch(actionCreator(DISAPPROVE_MATCH, accountId));
};

export const getCurrentMatches = (token, accountType) => async dispatch => {
    let url = '/jobs';
    if (accountType === 'company') {
        url = '/users';
    }

    // back end doesn't know how to store or get me just the matches so I have
    // have to collect all the data of either all the users or all of the jobs.
    // TODO: change if backend figures it out or sort data if backend doesn't
    requestWithToken(token)
        .get(url)
        .then(res => {
            let accountType = 'job';
            if (accountType === 'company') {
                accountType = 'user';
            }
            res.data = res.data.map(account => {
                account.accountType = accountType;
                return account;
            });
            dispatch(actionCreator(FETCHED_CURRENT_MATCHES, res.data));
        })
        .catch(err => actionCreator(CURRENT_MATCHES_ERROR, err));
};
