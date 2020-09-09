import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditModal from './modal/editWindow';

function buttonEdit(props) {
    const { notesInfo } = props;

    return (
        <IconButton aria-label="edit">
            <EditModal notesInfo={notesInfo} />
        </IconButton>
    );
}

export default buttonEdit;
