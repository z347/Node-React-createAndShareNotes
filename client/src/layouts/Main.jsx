import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import RegistrationPage from '../pages/Registration';
import AuthenticationPage from '../pages/Auth';
import PageNotFound from '../pages/PageNotFound';
import UserCabinet from '../pages/UserCabinet';

const publicContent = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/login" component={AuthenticationPage} />
        <Route component={PageNotFound} />
    </Switch>
);

const privetContent = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cabinet" component={UserCabinet} />
        <Route component={PageNotFound} />
    </Switch>
);

function Main() {
    const state = useSelector(state => state.auth);

    return <Fragment>{state.isAuthenticated ? privetContent : publicContent}</Fragment>;
}

export default Main;
