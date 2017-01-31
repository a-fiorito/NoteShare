import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// the only scss require, other files can be imported inside main.scss
// check main.scss for more info.
require('../scss/main.scss');

import NoteShare from './NoteShare';
import LandingPage from './LandingPage';
import Homepage from './Homepage';

/**
 * Bootstraps the app by linking it to the div with id=app in index.html
 */

// bootstrap
render((
    <Router history={browserHistory}>
        <Route path="/" component={NoteShare}>
            <IndexRoute component={Homepage} />
            <Route path="login" component={LandingPage} />
            <Route path="signup" component={LandingPage} />
        </Route>
    </Router>

), document.getElementById('app'));
