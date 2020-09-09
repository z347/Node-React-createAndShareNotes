import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { editOneNotes, getAllNotes } from '../../../../store/actions/Notes.action';
import { store } from '../../../../helpers/store';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: '500px',
    },
    textarea: {
        width: '100%',
    },
    button: {
        float: 'right',
        marginTop: '25px',
    },
}));

function TransitionsModal(props) {
    const { notesInfo } = props;
    const token = store.getState().auth.token;

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit } = useForm({
        mode: 'onBlur',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitHandler = async (data, event) => {
        try {
            event.preventDefault();
            await props.editNotes(token, notesInfo._id, data.notes, '/api/notes/edit');
            await props.getNotes(token, '/api/notes');
            handleClose();
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <Fragment>
            <EditIcon onClick={handleOpen} />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Edit notes:</h2>
                        <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
                            <TextareaAutosize
                                id="notes"
                                name="notes"
                                rowsMin={10}
                                className={classes.textarea}
                                defaultValue={notesInfo.notes}
                                ref={register}
                            />
                            <div>
                                <Button
                                    variant="contained"
                                    color="default"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        editNotes: (token, notesId, data, url) => dispatch(editOneNotes(token, notesId, data, url)),
        getNotes: (token, url) => dispatch(getAllNotes(token, url)),
    };
}

export default connect(null, mapDispatchToProps)(TransitionsModal);
