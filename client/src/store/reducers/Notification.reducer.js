import { NOTIFICATION } from '../../constants/actionTypes';

const { getMessageError, getMessageSuccess, clearNotification } = NOTIFICATION;

const initialState = {
    messageError: false,
    messageSuccess: false,
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case getMessageError:
            return {
                ...state,
                messageError: action.messageError,
            };
        case getMessageSuccess:
            return {
                ...state,
                messageSuccess: action.messageSuccess,
            };
        case clearNotification:
            return {
                ...state,
                messageSuccess: false,
                messageError: false,
            };
        default:
            return state;
    }
}
