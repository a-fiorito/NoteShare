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


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
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
                <div className="form-group">
                    <label className="form-label">EMAIL</label>
                    <input 
                        type="text"
                        value={this.state.email}
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        onChange={this._onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">PASSWORD</label>
                    <input 
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Enter your password"
                        onChange={this._onChange}
                    />
                </div>
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
            console.log(res);
        })
        .catch(err => this.setState({errors: err.response.data, isLoading: false}));
        
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this._onSubmit} className="landing-form">
                <h1>Create an Account</h1>
                <div className={"form-group" + (errors.username ? " error" : "")}>
                    <label className="form-label">USERNAME</label>
                    <input 
                        type="text"
                        value={this.state.username}
                        name="username"
                        className="form-input"
                        placeholder="Create a username"
                        onChange={this._onChange}
                    />
                    {errors.username && <span className="form-error">{errors.username}</span>}
                </div>
                <div className={"form-group" + (errors.email ? " error" : "")}>
                    <label className="form-label">EMAIL</label>
                    <input 
                        type="text"
                        value={this.state.email}
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        onChange={this._onChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className={"form-group" + (errors.password ? " error" : "")}>
                    <label className="form-label">PASSWORD</label>
                    <input 
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Enter your password"
                        onChange={this._onChange}
                    />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="form-button">
                    Register
                    </button>
                </div>
            </form>
        );
    }
}