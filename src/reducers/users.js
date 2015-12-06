import * as authEvents from '../constants/AuthEvents';

const initialState = {
    list: [],
    isLoading: false
};

export default function users (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case authEvents.GET_USERS_SUCCEEDED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        case authEvents.GET_USERS_FAILED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        default:
            return state;
    }

}
