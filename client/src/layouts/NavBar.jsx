import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { logout } from '../store/actions/Auth.action';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(2),
    },
    a: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    linkTitle: {
        color: 'inherit',
        textDecoration: 'inherit',
        fontSize: '1.25rem',
    },
}));

function NavBar(props) {
    const classes = useStyles();
    const state = useSelector(state => state.auth);

    const logoutHandler = event => {
        event.preventDefault();
        props.userLogout();
        props.history.push('/');
    };

    const userIsAuth = (
        <Fragment>
            <Button variant="outlined" color="inherit" className={classes.button}>
                <Link exact="true" to="/cabinet" role="link" className={classes.a}>
                    cabinet
                </Link>
            </Button>
            <Button variant="outlined" color="inherit">
                <Link exact="true" to="/" role="link" className={classes.a} onClick={logoutHandler}>
                    logout
                </Link>
            </Button>
        </Fragment>
    );

    const userToAuth = (
        <Fragment>
            <Button variant="outlined" color="inherit" className={classes.button}>
                <Link exact="true" to="/login" role="link" className={classes.a}>
                    sign in
                </Link>
            </Button>
            <Button variant="outlined" color="inherit">
                <Link exact="true" to="/registration" role="link" className={classes.a}>
                    sign up
                </Link>
            </Button>
        </Fragment>
    );

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Box component="h6" m={1} className={classes.title}>
                    <Link exact="true" to="/" role="link" className={classes.linkTitle}>
                        Nerdy Soft
                    </Link>
                </Box>
                {state.isAuthenticated ? userIsAuth : userToAuth}
            </Toolbar>
        </AppBar>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(logout()),
    };
}

export default connect(null, mapDispatchToProps)(withRouter(NavBar));
