import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import auth from './utils/auth';

// the only scss require, other files can be imported inside main.scss
// check main.scss for more info.
require('../scss/main.scss');


import NoteShare from './Global/NoteShare';
import LandingPage from './Global/LandingPage';
import Homepage from './Global/Homepage';
import Dashboard from './Dashboard/Dashboard';
import authenticate from './Abstract/Authenticate';
import Profile from './Profile/Profile';


/**
 * Bootstraps the app by linking it to the div with id=app in index.html
 */

// set auth token when app loads
if(localStorage.jwtToken) {
    auth.setAuthToken(localStorage.jwtToken);
}

// Route all different pages
render((
    <Router history={browserHistory}>
        <Route path="/" component={NoteShare}>
            <IndexRoute component={Homepage} />
            <Route path="login" component={LandingPage} onEnter={auth.loggedIn} />
            <Route path="signup" component={LandingPage} onEnter={auth.loggedIn} />
            <Route path="dashboard(/:name/:id)" component={authenticate(Dashboard)} />
            <Route path="profile/:username(/:name/:id)" component={authenticate(Profile)} />

        </Route>
    </Router>

), document.getElementById('app'));
