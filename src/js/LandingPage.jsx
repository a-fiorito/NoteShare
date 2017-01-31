import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';


export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formType: 'login'
        }
    }

    render() {
        console.log(this.props);
        let path = this.props.location.pathname;
        return (
            <div className="landing-page">
                <div className="landing-page-form-container">
                    {path == "/login" ? <LoginForm /> : <SignUpForm /> }
                    <div className="form-choice-buttons">
                        <Link to="/login"><div className={"choice" + (path == "/login" ? " selected" : "")}>SIGN IN</div></Link>
    <Link to="/signup"><div className={"choice" + (path == "/signup" ? " selected" : "")}>SIGN UP</div></Link>
                    </div>
                </div>
            </div>
        );
    }
}

const FormGroup = ({name, value, label, error, type, placeholder, onChange}) => {
    return (
        <div className={"form-group" + (error ? " error" : "")}>
            <label className="form-label">{label.toUpperCase()}</label>
            <input 
                type={type}
                value={value}
                name={name}
                className="form-input"
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <span className="form-error">{error}</span>}
        </div>
    );
}

FormGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
}


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    _onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this._onSubmit} className="landing-form">
                <h1>Welcome, Please Sign in</h1>
                <FormGroup
                    type="text"
                    label="username"
                    value={this.state.username}
                    name="username"
                    placeholder="Enter your username"
                    onChange={this._onChange}
                />
                <FormGroup
                    type="password"
                    label="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={this._onChange}
                />
                <div className="form-group">
                    <button className="form-button">
                    Login
                    </button>
                </div>
            </form>
        );
    }
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {},
            isLoading: false
        }
    }

    _onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    _onSubmit = (e) => {
        e.preventDefault();
        this.setState({errors: {}, isLoading: true});

        axios.post('/authenticate/user', {
            user: this.state
        })
        .then(res => {
            console.log('res');
            this.context.router.push('/')
        })
        .catch(err => this.setState({errors: err.response.data, isLoading: false}));
        
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this._onSubmit} className="landing-form">
                <h1>Create an Account</h1>
                <FormGroup
                    type="text"
                    label="username"
                    error={this.state.errors.username}
                    value={this.state.username}
                    name="username"
                    placeholder="Choose a username"
                    onChange={this._onChange}
                />
                <FormGroup
                    type="text"
                    label="email"
                    error={this.state.errors.email}
                    value={this.state.email}
                    name="email"
                    placeholder="Enter your email"
                    onChange={this._onChange}
                />
                <FormGroup
                    type="password"
                    label="password"
                    error={this.state.errors.password}
                    value={this.state.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={this._onChange}
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="form-button">
                    Register
                    </button>
                </div>
            </form>
        );
    }
}

SignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}