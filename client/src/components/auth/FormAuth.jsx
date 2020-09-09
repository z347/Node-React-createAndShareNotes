import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { sendUserDataToAuth } from '../../store/actions/Auth.action';
import Snackbar from '../notification/Snackbar';
import autoRedirect from '../../helpers/autoRedirect';
import { store } from '../../helpers/store';

const useStyles = makeStyles(theme => ({
    FormTask: {
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '100%',
        '& > div': {
            margin: theme.spacing(1),
            width: '75%',
        },
        '& > button': {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(10),
            width: '75%',
            height: '4rem',
        },
        '& > div.MuiAlert-root': {
            display: 'inline-flex',
            width: '75%',
        },
    },
}));

function FormAuth(props) {
    const classes = useStyles();
    const errorMessage = store.getState().notification.messageError;

    const { register, handleSubmit, errors, formState, reset } = useForm({
        mode: 'onBlur',
    });

    const submitHandler = async (data, event) => {
        try {
            event.preventDefault();
            reset();
            await store.dispatch(sendUserDataToAuth(data, '/api/auth/login'));
            autoRedirect(props);
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <Fragment>
            {errorMessage ? <Snackbar /> : null}
            <form className={classes.FormTask} autoComplete="on" onSubmit={handleSubmit(submitHandler)}>
                <TextField
                    id="email"
                    name="email"
                    label="Email address *"
                    type="email"
                    variant="outlined"
                    inputRef={register({
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        },
                    })}
                />
                {errors.email && errors.email.type === 'required' && <Alert severity="error">Email is required</Alert>}
                {errors.email && errors.email.type === 'pattern' && <Alert severity="error">Invalid email</Alert>}

                <TextField
                    id="password"
                    name="password"
                    label="Password *"
                    type="password"
                    variant="outlined"
                    inputRef={register({
                        required: true,
                        minLength: 6,
                    })}
                />
                {errors.password && errors.password.type === 'required' && (
                    <Alert severity="error">Password is required</Alert>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                    <Alert severity="error">Min length: 6</Alert>
                )}

                <Button variant="contained" size="large" color="primary" type="submit" disabled={!formState.isValid}>
                    sing in
                </Button>
            </form>
        </Fragment>
    );
}

export default withRouter(FormAuth);
