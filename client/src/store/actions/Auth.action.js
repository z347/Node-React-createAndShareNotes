import types from '../../constants/actionTypes';
import { getMessageError, clearNotification, autoClearNotification } from './Notification.action';

export function sendUserDataToAuth(data, url) {
    return async dispatch => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            dispatch(clearNotification());
            response.ok && response.status === 200
                ? dispatch(authSuccess(json)) && dispatch(autoLogout(json.expires))
                : dispatch(getMessageError(json)) && dispatch(autoClearNotification());
        } catch (e) {
            console.error(e.message);
        }
    };
}

export function authSuccess(data) {
    const { token, userId } = data;
    localStorage.setItem('userToken', token);
    return {
        type: types.AUTH.authSuccess,
        token,
        userId,
        isAuthenticated: true,
    };
}

export function autoLogout(time) {
    console.log('autoLogout');
    return dispatch => setTimeout(() => dispatch(logout()), time * 1000);
    // return dispatch => setTimeout(() => dispatch(logout()), 5000);   // test
}

export function logout() {
    // window.location.replace('/logout');
    // window.location.replace('/');

    localStorage.removeItem('userToken');
    return {
        type: types.AUTH.logout,
        token: false,
        userId: false,
        isAuthenticated: false,
    };
}
