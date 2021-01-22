import {
    REGISTERED_USER,
    SET_CURRENT_USER,
} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    registeredUser: {},
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user,
            };
        case REGISTERED_USER:
            return {
                ...state,
                registeredUser: action.registeredUser,
            };
        default:
            return state;
    }
};
