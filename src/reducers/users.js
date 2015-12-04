import * as authEvents from '../constants/AuthEvents';

const initialState = {
    authenticated: false,
    username: null
};

export default function (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case authEvents.USER_FETCH_SUCCEEDED:
            return {
                ...state,
                authenticated: true,
                username: data.username,
            };

        case authEvents.TOKEN_DELETE_FAILED:
            return {
                ...state,
                authenticated: false,
            };

        default:
            return state;
    }

}
