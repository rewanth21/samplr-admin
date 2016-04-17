import * as APIEvents from '../constants/APIEvents';

const initialState = {
    list: [],
    isLoading: false
};

export default function users (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.GET_USERS:
            return {
                ...state,
                isLoading: true
            };
        case APIEvents.GET_USERS_SUCCEEDED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        case APIEvents.GET_USERS_FAILED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        default:
            return state;
    }

}
