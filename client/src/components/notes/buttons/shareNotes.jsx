import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShareWindow from './modal/shareWindow';

export default function buttonShare(props) {
    const { notesId, socket } = props;
    return (
        <IconButton aria-label="share">
            <ShareWindow notesId={notesId} socket={socket} />
        </IconButton>
    );
}
