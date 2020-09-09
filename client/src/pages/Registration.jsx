import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormRegistration from '../components/auth/FormRegistration';

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5),
        backgroundColor: '#cfe8fc',
    },
    paper: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: 'primary',
    },
    title: {
        margin: theme.spacing(5),
        marginBottom: theme.spacing(10),
    },
}));

export default function Registration() {
    const classes = useStyles();

    useEffect(() => {
        document.title = `Registration page`;
    });

    return (
        <Container maxWidth="md">
            <Typography component="main" className={classes.container}>
                <Paper className={classes.paper} elevation={2}>
                    <Grid container justify="center">
                        <Typography variant="h4" component="h2" gutterBottom className={classes.title}>
                            Create your account
                        </Typography>

                        <FormRegistration />
                    </Grid>
                </Paper>
            </Typography>
        </Container>
    );
}
