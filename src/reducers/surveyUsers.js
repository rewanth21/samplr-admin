import * as APIEvents from '../constants/APIEvents';

const initialState = {
    list: [],
    isLoading: true
};

export default function surveyUsers (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.ADD_SURVEY_USER_SUCCEEDED:
            return {
                ...state,
                list: [...state.list, data.users[0]]
            }
        case APIEvents.GET_SURVEY_USERS_SUCCEEDED:
            return {
                ...state,
                list: data,
                isLoading: false
            };

        case APIEvents.GET_SURVEY_USERS_FAILED:
            return {
                ...state,
                list: [],
                isLoading: false
            };

        default:
            return state;
    }

}
