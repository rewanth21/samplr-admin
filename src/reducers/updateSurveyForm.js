import * as APIEvents from '../constants/APIEvents';

const initialState = {
    name: '',
    isLoading: false,
}

export default function updateGroupForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.UPDATE_SURVEY:
            return {
                ...state,
                name: data.name,
                isLoading: true,
            };

        case APIEvents.UPDATE_SURVEY_SUCCEEDED:
            return {
                ...state,
                isLoading: false
            };

        case APIEvents.UPDATE_SURVEY_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }

}
