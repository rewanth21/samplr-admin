import * as APIEvents from '../constants/APIEvents';

const initialState = {
    userId: null,
    dateRange: null,
    start: null,
    end: null,
    isLoading: false,
}

export default function addSurveyUsersForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.ADD_SURVEY_USER:
            return {
                ...state,
                isLoading: true
            };

        case APIEvents.ADD_SURVEY_USER_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                userId: data.userId,
                start: data.start,
                end: data.end
            }

        case APIEvents.ADD_SURVEY_USER_FAILED:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }

}
