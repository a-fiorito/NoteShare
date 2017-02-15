import React, {Component} from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let user = this.props.user;
		return (
			<div className="nav-bar">
				<div className="brand">NoteShare</div>
				<div className="menu">
					<ul>
						<li><Link to="/">Home</Link></li>
						{user ? <li><Link to="/dashboard">Dashboard</Link></li> : null}
						{user ? <li><Link>Profile</Link></li> : null}
						{/*<li><Link>FAQ</Link></li>*/}
						{/*<li><Link>Contact</Link></li>*/}
						{user ? <li onClick={this.props.signOut.bind(this)}><Link to="/login">Log Out</Link></li> : <li><Link to="/login">Sign In / Sign Up</Link></li>}
					</ul>
				</div>
			</div>
		);
	}

}

export default Navbar;