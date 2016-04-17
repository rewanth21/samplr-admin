import * as APIEvents from '../constants/APIEvents';

const initialState = {
    title: '',
    responses: [],
    responseTitle: '',
    isBranchQuestion:'',
    isLoading: false,
}

export default function addSurveyQuestionsForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.ADD_SURVEY_QUESTION:
            return {
                ...state,
                isLoading: true
            };

        case APIEvents.ADD_SURVEY_QUESTION_SUCCEEDED:
            return {
                ...state,
                isLoading: false
            }

        case APIEvents.ADD_SURVEY_QUESTION_FAILED:
            return {
                ...state,
                isLoading: false,
                 error: "Please enter all fields"
            };

        default:
            return state;
    }

}
