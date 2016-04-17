import * as APIEvents from '../constants/APIEvents';

const initialState = {
    mainQuestionId:'',
    branchId: '',
    responseId: '',
    isLoading: false,
}

export default function addBranchQuestionForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.ADD_BRANCH_QUESTION:
            return {
                ...state,
                isLoading: true,
                 error: undefined
            };

        case APIEvents.ADD_BRANCH_QUESTION_SUCCEEDED:
             return {
                ...state,
                isLoading: false,
                 error: undefined
            };

            

        case APIEvents.ADD_BRANCH_QUESTION_FAILED:
            return {
                ...state,
                isLoading: false,
                error: "Please select both fields"
            };

        default:
            return state;
    }

}