import {
    CHECKING_AUTHENTICATION,
    AUTHENTICATED,
    ERROR,
    REGISTERED,
    AUTHENTICATED_FROM_LOCAL_STORAGE,
} from '../actions/appActions';

const initialState = {
    authenticated: false,
    token: null,
    fetching: false,
    error: null,
    registered: null,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED_FROM_LOCAL_STORAGE:
            return {
                ...state,
                token: action.payload,
                authenticated: true,
                error: null,
            };
        case CHECKING_AUTHENTICATION:
            return { ...state, fetching: true };
        case AUTHENTICATED:
            return {
                authenticated: true,
                token: action.payload,
                fetching: false,
                error: null,
            };
        case ERROR:
            return { ...state, fetching: false, error: action.payload };
        default:
            return state;
    }
};
