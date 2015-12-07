import * as APIEvents from '../constants/APIEvents';

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    age: null,
    isResearcher: false,
    isLoading: false,
}

export default function createUserForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.CREATE_USER:
            return {
                ...state,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                age: data.age,
                isLoading: true,
                error: undefined
            };

        case APIEvents.CREATE_USER_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                error: undefined
            };

        case APIEvents.CREATE_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: data
            };

        default:
            return state;
    }

}
