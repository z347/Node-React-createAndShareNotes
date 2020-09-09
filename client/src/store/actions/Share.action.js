import types from '../../constants/actionTypes';
import { autoClearNotification, clearNotification, getMessageError, getMessageSuccess } from './Notification.action';

export function getAllUsers(token, url) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });
            const json = await response.json();
            dispatch(clearNotification());
            response.ok && response.status === 200
                ? dispatch(getUsersSuccess(json))
                : dispatch(getMessageError(json)) && dispatch(autoClearNotification());
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function shareWithUser(token, url, shareWith, notesId) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    samedate: shareWith + ' ' + notesId,
                },
            });
            const json = await response.json();
            dispatch(clearNotification());
            response.ok && response.status === 200
                ? dispatch(getMessageSuccess(json)) && dispatch(autoClearNotification())
                : dispatch(getMessageError(json)) && dispatch(autoClearNotification());
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function getUsersSuccess(data) {
    const { users } = data;
    return {
        type: types.SHARE.getUsersSuccess,
        usersArray: users,
    };
}
