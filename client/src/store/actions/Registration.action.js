import { getMessageSuccess, getMessageError, clearNotification, autoClearNotification } from './Notification.action';

export function userDataToRegistration(data, url) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            dispatch(clearNotification());
            response.ok && response.status === 201
                ? dispatch(getMessageSuccess(json)) && dispatch(autoClearNotification())
                : dispatch(getMessageError(json)) && dispatch(autoClearNotification());
        } catch (e) {
            console.error(e.message);
        }
    };
}
