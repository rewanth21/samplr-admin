import * as APIEvents from '../constants/APIEvents';

const initialState = {
    questions: [],
    isLoading: false,
}

export default function addSurveyQuestionsForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.ADD_QUESTIONS:
            return {
                ...state,
                isLoading: true
            };

        case APIEvents.ADD_QUESTIONS_SUCCEEDED:
            return {
                ...state,
                isLoading: false
            }

        case APIEvents.ADD_QUESTIONS_FAILED:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }

}
