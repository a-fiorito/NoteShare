import React, {Component} from 'react';
import auth from './utils/auth';

import Navbar from './Navbar';

/**
 * Main container component
 * Place all child components within the div tags
 */
class NoteShare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth.getCredentials(localStorage.getItem('jwtToken'))
        }
    }

    componentDidUpdate() {
        if(localStorage.jwtToken && !this.state.user) {
            this.setState({user: auth.getCredentials(localStorage.getItem('jwtToken'))});
        }
    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        auth.setAuthToken(null);
        this.setState({user: null});
        this.context.router.push('/login');
    }

    render() {
        return (
            <div className="app-container">
                <Navbar signOut={this.logout} user={this.state.user} />
                {this.props.children}
            </div>
        );
    }
}

NoteShare.contextTypes = {
    router: React.PropTypes.object.isRequired
}


// there can only be one "export default" per file
// if you want to export more than one component in a single file you can just use 
// export ComponentName;
// When you use "export default", you import by writing import ComponentName from 'filelocation';
// When you just use "export" it needs to be before the type declaration (eg. export class NoteShare ...)
// you import by writing import {ComponentName} from 'filelocation';
// the file location doesn't need a file extension for both methods of export
export default NoteShare;