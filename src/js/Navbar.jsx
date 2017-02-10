import React, {Component} from 'react';
import { Link } from 'react-router'

class Navbar extends Component {
	constructor(props) {
		super(props);

	}


	render() {
		let user = this.props.user;
		return (
			<div className="nav-bar">
				<div className="brand"><p>NoteShare</p></div>
				<ul>
					<li><Link to="/">Home</Link></li>
					{user ? <li><Link to="/dashboard">Dashboard</Link></li> : null}
					<li>Profile</li>
					{user ? <li onClick={this.props.signOut.bind(this)}>Log out</li> : <li><Link to="/login">Signup/Signin</Link></li>}
				</ul>
			</div>
		);
	}

}

export default Navbar;