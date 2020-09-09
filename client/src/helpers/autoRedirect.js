import { store } from './store';

export default function autoRedirect(props) {
    const { isAuthenticated } = store.getState().auth;
    isAuthenticated ? props.history.push('/cabinet') : props.history.push('/login');
}
