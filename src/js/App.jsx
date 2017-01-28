import React from 'react';
import ReactDOM from 'react-dom';

// the only scss require, other files can be imported inside main.scss
// check main.scss for more info.
require('../scss/main.scss');

import NoteShare from './NoteShare';

/**
 * Bootstraps the app by linking it to the div with id=app in index.html
 */
export default class App extends React.Component {
    render() {
        return <NoteShare />;
    }
}

// bootstrap
ReactDOM.render(<App />, document.getElementById('app'));
