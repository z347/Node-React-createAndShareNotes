import { SHARE } from '../../constants/actionTypes';

const { getUsersSuccess } = SHARE;

const initialState = {
    usersArray: [{ _id: '1', email: 'fake@mail.com' }],
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case getUsersSuccess:
            return {
                ...state,
                usersArray: action.usersArray,
            };
        default:
            return state;
    }
}
