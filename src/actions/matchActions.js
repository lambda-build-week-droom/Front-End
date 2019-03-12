import { requestWithToken } from './axios';
import actionCreator from './actionCreator';

export const APPROVE_MATCH = 'APPROVE_MATCH';
export const MATCHES_FETCHED = 'MATCHES_FETCHED';
export const MATCH_ERROR = 'MATCH_ERROR';
export const DISAPPROVE_MATCH = 'DISAPPROVE_MATCH';

export const approveMatch = accountId => async dispatch => {
    //TODO: tie in to backend to communicate matches.
    dispatch(actionCreator(APPROVE_MATCH, accountId));
    //TODO: send error to reducer is something goes wrong.
};

export const getStream = (token, accountType) => async dispatch => {
    let url = '/companies';
    if (accountType === 'user') {
        url = '/users';
    }
    requestWithToken(token)
        .get(url)
        .then(res => dispatch(actionCreator(MATCHES_FETCHED, res.data)))
        .catch(err => dispatch(actionCreator(MATCH_ERROR, err)));
};

export const disApproveMatch = accountId => async dispatch => {
    //TODO: send disapproval to backend.

    dispatch(actionCreator(DISAPPROVE_MATCH, accountId));
};
