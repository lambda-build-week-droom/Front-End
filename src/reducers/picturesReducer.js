import {} from '../actions/appActions';

const initialState = {
    pictures: [],
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
