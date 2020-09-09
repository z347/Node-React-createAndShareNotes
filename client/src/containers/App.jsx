import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../layouts/NavBar';
import Main from '../layouts/Main';
import 'typeface-roboto';

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <NavBar />
            <Main />
        </BrowserRouter>
    );
}

export default App;
