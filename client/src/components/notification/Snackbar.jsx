import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function Snackbars() {
    const messageError = useSelector(state => state.notification.messageError);
    const messageSuccess = useSelector(state => state.notification.messageSuccess);

    const [open, setOpen] = useState(true);

    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const snackbar = (
        <Snackbar onClose={handleClose} anchorOrigin={{ vertical, horizontal }} open={open}>
            <Alert onClose={handleClose} variant="filled" severity={messageError ? 'error' : 'success'}>
                {messageError || messageSuccess}
            </Alert>
        </Snackbar>
    );

    return <Fragment>{messageError || messageSuccess ? snackbar : null}</Fragment>;
}
