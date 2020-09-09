import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/reducers/Root.reducer';

const oldState = loadState();

export const store = createStore(rootReducer, oldState, composeWithDevTools(applyMiddleware(thunk)));

//  Add a change listener to the store, and invoke our saveState function defined above.
store.subscribe(() => saveState(store.getState()));

// This function accepts the app state, and saves it to localStorage
function saveState(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('app_state', serialisedState);
    } catch (e) {
        console.error(e.message);
    }
}

// This function checks if the app state is saved in localStorage
function loadState() {
    try {
        const serialisedState = localStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        return undefined;
    }
}
