import * as APIEvents from '../constants/APIEvents';

const initialState = {
    list: [],
    isLoading: true
};

export default function surveys (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.GET_GROUP_SURVEYS_SUCCEEDED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        case APIEvents.GET_GROUP_SURVEYS_FAILED:
            return {
                ...state,
                list: [],
                isLoading: false
            };

        default:
            return state;
    }

}
