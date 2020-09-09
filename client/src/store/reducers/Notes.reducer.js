import { NOTES } from '../../constants/actionTypes';

const { getNotesSuccess } = NOTES;

const initialState = {
    notesArray: [{ _id: 1, notes: 'fake notes', owner: 1 }],
};

export default function notesReducer(state = initialState, action) {
    switch (action.type) {
        case getNotesSuccess:
            return {
                ...state,
                notesArray: action.notesArray,
            };
        default:
            return state;
    }
}
