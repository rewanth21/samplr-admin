import * as APIEvents from '../constants/APIEvents';

const initialState = {
    name: '',
    isLoading: false,
}

export default function updateGroupForm (state = initialState, action = {}) {

    const { data, type } = action;

    switch (type) {
        case APIEvents.UPDATE_GROUP:
            return {
                ...state,
                name: data.name,
                isLoading: true,
            };

        case APIEvents.UPDATE_GROUP_SUCCEEDED:
            return initialState;

        case APIEvents.UPDATE_GROUP_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }

}
