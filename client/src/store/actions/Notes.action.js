import types from '../../constants/actionTypes';
import { getMessageError, clearNotification, autoClearNotification } from './Notification.action';

export function getAllNotes(token, url) {
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
                ? dispatch(getNotesSuccess(json))
                : dispatch(getMessageError(json)) && dispatch(autoClearNotification());
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function sendNewNotes(data, url, token) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (!response.ok) {
                dispatch(getMessageError(json)) && dispatch(autoClearNotification());
            }
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function deleteOneNotes(token, notesId, url) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    id: notesId,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                dispatch(getMessageError(json)) && dispatch(autoClearNotification());
            }
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function editOneNotes(token, notesId, data, url) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    id: notesId,
                    notes: data,
                },
            });
            const json = await response.json();
            if (!response.ok) {
                dispatch(getMessageError(json)) && dispatch(autoClearNotification());
            }
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function getNotesSuccess(data) {
    const { notes } = data;
    return {
        type: types.NOTES.getNotesSuccess,
        notesArray: notes,
    };
}
