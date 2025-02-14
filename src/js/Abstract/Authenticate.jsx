import React, { Component } from 'react';
import auth from '../utils/auth';

/**
 * HOC for validating routes
 * If user is not signed in, prevents access to page
 */
export default function (Comp) {
    class Authenticate extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isAuthenticated: false,
                user: null
            }
        }

        componentWillMount() {
            let user = auth.getCredentials(localStorage.getItem('jwtToken'));   // check if user is already logged in
            this.renewAuth(user);
        }

        /**
         * Accepts the user token or rejects it
         */
        renewAuth = (user) => {
            if (user) {
                this.setState({ user: user });
            } else { // access denied
                this.context.router.push('/login');
            }
        }

        render() {
            let newProps = { user: this.state.user, renewAuth: this.renewAuth };
            // if user signed in, give user as props to component
            return <Comp {...this.props} {...newProps} />;
        }
    }

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    return Authenticate;
}


