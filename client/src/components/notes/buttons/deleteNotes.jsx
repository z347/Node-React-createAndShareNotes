import React from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { getAllNotes, deleteOneNotes } from '../../../store/actions/Notes.action';
import { store } from '../../../helpers/store';

function buttonDelete(props) {
    const { notesId } = props;
    const token = store.getState().auth.token;

    const deleteHandler = async event => {
        try {
            event.preventDefault();
            await props.deleteNotes(token, notesId, '/api/notes/delete');
            await props.getNotes(token, '/api/notes');
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <IconButton aria-label="delete" onClick={deleteHandler}>
            <DeleteIcon />
        </IconButton>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        deleteNotes: (token, notesId, url) => dispatch(deleteOneNotes(token, notesId, url)),
        getNotes: (token, url) => dispatch(getAllNotes(token, url)),
    };
}

export default connect(null, mapDispatchToProps)(buttonDelete);
