import * as APIEvents from '../constants/APIEvents';

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    age: null,
    isLoading: false,
}

export default function createUserForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.CREATE_GROUP:
            return {
                ...state,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                age: data.age,
                isLoading: true,
            };

        case APIEvents.CREATE_GROUP_SUCCEEDED:
            return {
                ...state,
                isLoading: false
            };

        case APIEvents.CREATE_GROUP_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }

}
