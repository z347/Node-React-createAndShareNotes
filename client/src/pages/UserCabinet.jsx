import io from 'socket.io-client';
import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import Snackbar from '../components/notification/Snackbar';
import TableNotes from '../components/notes/getNotes';
import InputTask from '../components/notes/createNotes';
import { getAllNotes } from '../store/actions/Notes.action';
import { store } from '../helpers/store';

export default function UserCabinet() {
    const messageError = useSelector(state => state.notification.messageError);
    const token = useSelector(state => state.auth.token);

    let socket = io('http://localhost:3000');
    socket.on('connect', () => console.info(`Your ID: ${socket.id}`));
    socket.on('share success', async () => await store.dispatch(getAllNotes(token, '/api/notes')));

    useEffect(() => {
        document.title = `User cabinet`;
    });

    useEffect(() => {
        return () => {
            socket.disconnect(console.info(`You left: ${socket.id}`));
        };
    }, [socket]);

    return (
        <Container maxWidth="md">
            {messageError ? <Snackbar /> : null}
            <InputTask />
            <TableNotes socket={socket} />
        </Container>
    );
}
