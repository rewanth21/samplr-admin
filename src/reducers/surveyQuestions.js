import * as APIEvents from '../constants/APIEvents';

const initialState = {
    list: [],
    isLoading: true
};

export default function surveyQuestions (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.ADD_SURVEY_QUESTION_SUCCEEDED:
            return {
                ...state,
                list: [...state.list, data]
            }
        case APIEvents.GET_SURVEY_QUESTIONS_SUCCEEDED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        case APIEvents.GET_SURVEY_QUESTIONS_FAILED:
            return {
                ...state,
                list: [],
                isLoading: false
            };

        default:
            return state;
    }

}
