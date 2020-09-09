import { combineReducers } from 'redux';
import authReducer from './Auth.reducer';
import notificationReducer from './Notification.reducer';
import notesReducer from './Notes.reducer';
import shareReducer from './Share.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    notes: notesReducer,
    users: shareReducer,
});

export default rootReducer;
