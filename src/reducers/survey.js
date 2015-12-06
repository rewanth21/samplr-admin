import * as APIEvents from '../constants/APIEvents';

const initialState = {
    item: [],
    isLoading: true
};

export default function survey (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.GET_SURVEY_SUCCEEDED:
            return {
                ...state,
                item: data,
                isLoading: false
            };

        case APIEvents.GET_SURVEY_FAILED:
            return {
                ...state,
                item: [],
                isLoading: false
            };

        default:
            return state;
    }

}
