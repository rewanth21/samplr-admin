import * as APIEvents from '../constants/APIEvents';

const initialState = {
    name: '',
    isLoading: false,
}

export default function createGroupForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.CREATE_GROUP:
            return {
                ...state,
                name: data.name,
                isLoading: true,
            };

        case APIEvents.CREATE_GROUP_SUCCEEDED:
            return initialState;

        case APIEvents.CREATE_GROUP_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }

}
