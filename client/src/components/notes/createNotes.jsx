import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { sendNewNotes, getAllNotes } from '../../store/actions/Notes.action';

const useStyles = makeStyles(() => ({
    FormTask: {
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '80%',
        margin: '50px auto',
    },
    input: {
        paddingRight: '20px',
        flexGrow: 1,
    },
}));

function CreateNotes(props) {
    const classes = useStyles();

    const token = useSelector(state => state.auth.token);

    const { register, handleSubmit, formState, reset } = useForm({
        mode: 'onBlur',
    });

    const submitHandler = async (data, event) => {
        try {
            event.preventDefault();
            reset();
            await props.sendNotes(data, '/api/notes/create', token);
            await props.getNotes(token, '/api/notes');
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <form className={classes.FormTask} autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
            <Grid container justify="space-between" direction="row">
                <TextField
                    className={classes.input}
                    id="notes"
                    name="notes"
                    label="New notes"
                    type="text"
                    variant="outlined"
                    inputRef={register({
                        required: true,
                    })}
                />
                <Button variant="contained" size="large" color="primary" type="submit" disabled={!formState.isValid}>
                    add
                </Button>
            </Grid>
        </form>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        sendNotes: (data, url, token) => dispatch(sendNewNotes(data, url, token)),
        getNotes: (token, url) => dispatch(getAllNotes(token, url)),
    };
}

export default connect(null, mapDispatchToProps)(CreateNotes);
