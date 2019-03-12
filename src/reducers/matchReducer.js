import {
    APPROVE_MATCH,
    MATCH_ERROR,
    MATCHES_FETCHED,
    DISAPPROVE_MATCH,
} from '../actions/matchActions';

const initialState = {
    stream: [],
    error: null,
};

export const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPROVE_MATCH:
            let stream = state.stream.filter(
                account => account.id !== action.payload
            );
            return {
                ...state,
                stream,
            };
        case MATCHES_FETCHED:
            return { stream: action.payload, error: null };
        case DISAPPROVE_MATCH:
            let thisStream = state.stream.filter(
                account => account.id !== action.payload
            );
            return { ...state, stream: thisStream, error: null };
        case MATCH_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
