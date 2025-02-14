import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import auth from '../utils/auth';

/**
 * Displays login and sign up
 */
export default class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formType: 'login'
        };
    }

    render() {
        // get path: login || signup
        let path = this.props.location.pathname;
        return (
            <div className="landing-page">
                <div className="landing-page-form-container">
                    {path == "/login" ? <LoginForm /> : <SignUpForm />}
                    <div className="form-choice-buttons">
                        <Link to="/login" activeClassName="active"><div className={"choice" + (path == "/login" ? " selected" : "")}>SIGN IN</div></Link>
                        <Link to="/signup" activeClassName="active"><div className={"choice" + (path == "/signup" ? " selected" : "")}>SIGN UP</div></Link>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Render the login form
 */
class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }
    }

    onChange = (e) => {
        // update input field
        this.setState({ [e.target.name]: e.target.value });
    }

    /**
     * User submits the login form
     */
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true }); // clear errors
        axios.post('/authenticate/login', {
            user: this.state
        })
            .then(res => {
                // if successful, save token in local storage
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                auth.setAuthToken(token);
                this.context.router.push('/dashboard') // redirect to dashboard
            })
            .catch(err => this.setState({ errors: err.response.data, isLoading: false }));

    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit} className="landing-form">
                <h1>Welcome, Please Sign in</h1>
                {errors.form && <div className="global-form-error">{errors.form}</div>}
                <FormGroup
                    type="text"
                    label="username"
                    value={this.state.username}
                    name="username"
                    placeholder="Enter your username"
                    onChange={this.onChange}
                />
                <FormGroup
                    type="password"
                    label="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={this.onChange}
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="form-button">LOGIN</button>
                </div>
            </form>
        );
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
}

/**
 * Render the signup form
 */
export class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
            type: '',
            password: '',
            errors: {},
            isLoading: false
        }
    }

    onChange = (e) => {
        // update input field
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelect = (e) => {
        this.setState({ type: e.target.value });
    }

    /**
     * User submits the signup form
     */
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true }); // clear errors

        axios.post('/authenticate/signup', {
            user: this.state
        })
            .then(res => {
                // if successful, save token in local storage
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                auth.setAuthToken(token);
                this.context.router.push('/dashboard') // redirect to dashboard
            })
            .catch(err => this.setState({ errors: err.response.data, isLoading: false }));

    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit} className="landing-form">
                <h1>Create an Account</h1>
                <FormGroup
                    type="text"
                    label="name"
                    error={this.state.errors.name}
                    value={this.state.name}
                    name="name"
                    placeholder="Enter your name"
                    onChange={this.onChange}
                />
                <FormGroup
                    type="text"
                    label="username"
                    error={this.state.errors.username}
                    value={this.state.username}
                    name="username"
                    placeholder="Choose a username"
                    onChange={this.onChange}
                />
                <FormGroup
                    type="text"
                    label="email"
                    error={this.state.errors.email}
                    value={this.state.email}
                    name="email"
                    placeholder="Enter your email"
                    onChange={this.onChange}
                />
                <SelectGroup
                    label="What best describes you?"
                    error={this.state.errors.type}
                    value={this.state.type}
                    onSelect={this.onSelect}
                />
                <FormGroup
                    type="password"
                    label="password"
                    error={this.state.errors.password}
                    value={this.state.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={this.onChange}
                />
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="form-button">REGISTER</button>
                </div>
            </form>
        );
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
}

/**
 * Component to render one field in a form
 */
const FormGroup = ({ name, value, label, error, type, placeholder, onChange }) => {
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

// This is good practice, should have done it for all components for better clarity
FormGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
}

/**
 * Component to render a drop-down menu
 */
const SelectGroup = ({ label, error, value, onSelect }) => {
    return (
        <div className={"form-group" + (error ? " error" : "")}>
            <label className="form-label">{label.toUpperCase()}</label>
            <select id="type" defaultValue="" required onChange={onSelect}>
                <option disabled value="">Select</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="TA">Teaching Assistant</option>
            </select>
            {error && <span className="form-error">{error}</span>}
        </div>
    );
}