import * as authEvents from '../constants/AuthEvents';

const initialState = {
    authenticated: false,
    email: null
};

export default function user (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case authEvents.USER_FETCH_SUCCEEDED:
            return {
                ...state,
                authenticated: true,
                email: data.email,
                userId: data.id
            };

        case authEvents.TOKEN_DELETE_FAILED:
            return {
                ...state,
                authenticated: false,
                userId: null
            };

        default:
            return state;
    }

}
