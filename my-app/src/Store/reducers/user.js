import {
    REGISTERED_USER,
    SET_CURRENT_USER,
    EDITED_USER,
    SET_USER_DATA
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
        case EDITED_USER:
            return {
                ...state, 
                editedUser: action.editedUser
            }
        case SET_USER_DATA:
            return {
                ...state, 
                userData: action.userData
            }    
        default:
            return state;
    }
};
