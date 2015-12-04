import * as authEvents from '../constants/AuthEvents';

const initialState = {
    username: '',
    isLoading: false,
}

export default function(state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case authEvents.LOGIN_SUBMITTED:
            return {
                ...state,
                username: data.username,
                isLoading: true,
            };

        case authEvents.LOGIN_SUCCEEDED:
            return initialState;

        case authEvents.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }

}
