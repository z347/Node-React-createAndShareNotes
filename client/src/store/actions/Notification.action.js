import types from '../../constants/actionTypes';

export function getMessageError(data) {
    const { message } = data;
    return {
        type: types.NOTIFICATION.getMessageError,
        messageError: message,
    };
}

export function getMessageSuccess(data) {
    const { message } = data;
    return {
        type: types.NOTIFICATION.getMessageSuccess,
        messageSuccess: message,
    };
}

export function autoClearNotification() {
    return dispatch => setTimeout(() => dispatch(clearNotification()), 5000);
}

export function clearNotification() {
    return {
        type: types.NOTIFICATION.clearNotification,
        messageSuccess: false,
        messageError: false,
    };
}
