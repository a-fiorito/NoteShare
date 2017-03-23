import React, {Component} from 'react';
import auth from '../utils/auth';

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

    /**
     * User clicks logout in the navbar
     */
    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('selectedCourse');
        auth.setAuthToken(null);
        this.setState({user: null});
        this.context.router.push('/login');
    }

    render() {
        return (
            <div className="app-container">
                <Navbar signOut={this.logout} user={this.state.user} />
                {this.props.children /* all pages of the app loaded by the router*/}
            </div>
        );
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
}

export default NoteShare;