import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

/**
 * Main navbar of the entire app, resizes based on screen size
 */
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false
        }
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    showMenu = () => {
        this.setState({ showNav: true });
    }

    hideMenu = () => {
        $('#slider').toggleClass('open');
        $('#cover').toggleClass('open');
        setTimeout(() => {
            this.setState({ showNav: false });
        }, 500);
    }

    render() {
        let user = this.props.user;
        let location = this.context.router.location.pathname;
        let nav = <Nav user={this.props.user} signOut={this.props.signOut} />;

        return (
            <div>
                <div className="nav-bar">
                    <div className="brand"><img src="/assets/images/icons/book.svg" />NOTESHARE</div>
                    <div className="menu">{nav}</div>
                    <div onClick={this.state.showNav ? this.hideMenu : this.showMenu} className="mobile-nav-button"><img src="/assets/images/icons/menu.svg" /></div>
                </div>
                {this.state.showNav && <MobileNav toggleMenu={this.hideMenu}>
                    {nav}
                </MobileNav>}
            </div>
        );
    }

}

class MobileNav extends Component {

    componentDidMount() {
        setTimeout(() => {
            $('#cover').toggleClass('open');
        }, 0)
        $('#slider').toggleClass('open');
    }

    render() {
        return (
            <div className="mobile-nav">
                <div onClick={this.props.toggleMenu} id="cover" className="cover"></div>
                <div id="slider" className="slider">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export const Nav = ({ user, signOut }) => {
    return (
        <ul className="navbar">
            <li><Link to="/" onlyActiveOnIndex activeClassName="active">HOME</Link></li>
            {user ? <li><Link to="/dashboard" activeClassName="active">DASHBOARD</Link></li> : null}
            {user ? <li><Link to={`/profile/${user.username}`} activeClassName="active">PROFILE</Link></li> : null}
            {user ? <li onClick={signOut}><Link to="/login">LOG OUT</Link></li> : <li><Link to="/login" className={location == "/signup" ? "active" : null} activeClassName="active">SIGN IN / SIGN UP</Link></li>}
        </ul>
    );
};
