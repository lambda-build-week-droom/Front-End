import {
    UPDATING_ACCOUNT_INFO,
    ACCOUNT_INFORMATION_UPDATED,
    ERROR,
} from '../actions/accountActions';

const initialState = {
    account: {},
    updatingAccountInfo: false,
    error: null,
};

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATING_ACCOUNT_INFO:
            return { ...state, updatingAccountInfo: true };
        case ACCOUNT_INFORMATION_UPDATED:
            return {
                ...state,
                updatingAccountInfo: false,
                account: action.payload,
                error: null,
            };
        case ERROR:
            return {
                ...state,
                updatingAccountInfo: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
