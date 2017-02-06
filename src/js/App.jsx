import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import auth from './utils/auth';

// the only scss require, other files can be imported inside main.scss
// check main.scss for more info.
require('../scss/main.scss');

import NoteShare from './NoteShare';
import LandingPage from './LandingPage';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import DocumentArea from './DocumentArea';
import authenticate from './Authenticate';

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
            <Route path="login" component={LandingPage} />
            <Route path="signup" component={LandingPage} />
            <Route path="dashboard" component={authenticate(Dashboard)} />
            <Route path="doc" component={DocumentArea} />
        </Route>
    </Router>

), document.getElementById('app'));
