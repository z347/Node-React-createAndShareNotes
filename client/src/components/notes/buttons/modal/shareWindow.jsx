import React, { Fragment, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { getAllUsers } from '../../../../store/actions/Share.action';
import { store } from '../../../../helpers/store';
import { shareWithUser } from '../../../../store/actions/Share.action';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const token = useSelector(state => state.auth.token);

    const classes = useStyles();
    const { onClose, selectedValue, open, notesId, socket } = props;
    const users = useSelector(state => state.users.usersArray);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = async email => {
        try {
            await store.dispatch(shareWithUser(token, '/api/share/notes', email, notesId));
            socket.emit('share notes with user', email);
            onClose(email);
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Click and share:</DialogTitle>
            <List>
                {users.map(item => (
                    <ListItem button onClick={() => handleListItemClick(item.email)} key={item._id}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.email} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogDemo(props) {
    const token = useSelector(state => state.auth.token);
    const users = useSelector(state => state.users.usersArray);

    const { notesId, socket } = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(users[0].email);

    const handleClickOpen = async () => {
        try {
            setOpen(true);
            await props.getUsers(token, '/api/share/users');
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleClose = value => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <Fragment>
            <ShareIcon onClick={handleClickOpen} />
            <SimpleDialog
                notesId={notesId}
                socket={socket}
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: (token, url) => dispatch(getAllUsers(token, url)),
    };
}

export default connect(null, mapDispatchToProps)(SimpleDialogDemo);
