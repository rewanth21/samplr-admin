import * as APIEvents from '../constants/APIEvents';

const initialState = {
    list: [],
    isLoading: true
};

export default function groups (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.GET_GROUPS_SUCCEEDED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        case APIEvents.GET_GROUPS_FAILED:
            return {
                ...state,
                list: [],
                isLoading: false
            };

        default:
            return state;
    }

}
