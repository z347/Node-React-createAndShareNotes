import { AUTH } from '../../constants/actionTypes';

const { authSuccess, logout } = AUTH;

const initialState = {
    token: false,
    userId: false,
    isAuthenticated: false,
};

export default function registrationReducer(state = initialState, action) {
    switch (action.type) {
        case authSuccess:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isAuthenticated: action.isAuthenticated,
            };
        case logout:
            return {
                ...state,
                token: false,
                userId: false,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
