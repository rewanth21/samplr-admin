import * as APIEvents from '../constants/APIEvents';

const initialState = {
    name: '',
    schedule: [],
    isLoading: false,
}

export default function createSurveyForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.CREATE_SURVEY:
            return {
                ...state,
                name: data.name,
                schedule: data.schedule,
                isLoading: true,
            };

        case APIEvents.CREATE_SURVEY_SUCCEEDED:
            return {
                ...state,
                isLoading: false
            }

        case APIEvents.CREATE_SURVEY_FAILED:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }

}
