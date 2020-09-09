import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { userDataToRegistration } from '../../store/actions/Registration.action';
import Snackbar from '../notification/Snackbar';

const useStyles = makeStyles(theme => ({
    formRegistration: {
        textAlign: 'center',
        verticalAlign: 'middle',
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

function FormRegistration(props) {
    const classes = useStyles();

    const message = useSelector(state => {
        if (state.notification.messageError) return state.notification.messageError;
        else if (state.notification.messageSuccess) return state.notification.messageSuccess;
        else return false;
    });

    const { register, handleSubmit, errors, formState, reset } = useForm({
        mode: 'onBlur',
    });

    const submitHandler = (data, event) => {
        event.preventDefault();
        reset();
        props.sendDataToServer(data, '/api/auth/register');
    };

    return (
        <Fragment>
            {message ? <Snackbar /> : null}
            <form className={classes.formRegistration} autoComplete="on" onSubmit={handleSubmit(submitHandler)}>
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

                <TextField
                    id="confirm"
                    name="confirm"
                    label="Confirm password *"
                    type="password"
                    variant="outlined"
                    inputRef={register({
                        required: true,
                        minLength: 6,
                    })}
                />
                {errors.confirm && errors.confirm.type === 'required' && (
                    <Alert severity="error">Confirm password is required</Alert>
                )}
                {errors.confirm && errors.confirm.type === 'minLength' && <Alert severity="error">Min length: 6</Alert>}

                <Button variant="contained" size="large" color="primary" type="submit" disabled={!formState.isValid}>
                    sing up
                </Button>
            </form>
        </Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        sendDataToServer: (data, url) => dispatch(userDataToRegistration(data, url)),
    };
}

export default connect(null, mapDispatchToProps)(FormRegistration);
