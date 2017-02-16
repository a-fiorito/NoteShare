import React, {Component} from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let user = this.props.user;
		let location = this.context.router.location.pathname;
		return (
			<div className="nav-bar">
				<div className="brand"><img src="/assets/images/book.svg" />NOTESHARE</div>
				<div className="menu">
					<ul>
						<li><Link to="/" onlyActiveOnIndex activeClassName="active">home</Link></li>
						{user ? <li><Link to="/dashboard" activeClassName="active">dashboard</Link></li> : null}
						{user ? <li><Link to="/profile" activeClassName="active">profile</Link></li> : null}
						{/*<li><Link>FAQ</Link></li>*/}
						{/*<li><Link>Contact</Link></li>*/}
						{user ? <li onClick={this.props.signOut.bind(this)}><Link to="/login">log out</Link></li> : <li><Link to="/login" className={location == "/signup" ? "active" : null} activeClassName="active">sign in / sign up</Link></li>}
					</ul>
				</div>
			</div>
		);
	}

}

Navbar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Navbar;
