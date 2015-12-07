import * as APIEvents from '../constants/APIEvents';

const initialState = {
    item: [],
    isLoading: true
};

export default function group (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.GET_GROUP_SUCCEEDED:
            return {
                ...state,
                item: data,
                isLoading: false
            };

        case APIEvents.GET_GROUP_FAILED:
            return {
                ...state,
                item: [],
                isLoading: false
            };

        default:
            return state;
    }

}
