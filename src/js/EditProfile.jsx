import React, {Component} from 'react';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            type: null
        };
    }

    _onChange = (e) => {
        // update input field
        this.setState({ [e.target.name]: e.target.value });
    }

     _onSelect = (e) => {
            this.setState({type: e.target.value});
        }

    render() {
        return (
            <div className="add-course">
                <div className="title">Edit Profile Info</div>
                <label>Name</label>
                <input onChange={this._onChange} name="name" type="text" />
                <label>Email</label>
                <input onChange={this._onChange} name="email" type="text" />
                <label>Type</label>
                <select id="type" defaultValue="" required onChange={this._onSelect}>
                <option disabled value="">Select</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="TA">Teaching Assistant</option>
            </select>
                <br></br>
                <div className="action-buttons">
                    <div className="cancel" onClick={this.props.cancelled.bind(this)}>Cancel</div>
                    <div className="save">Save</div>
                </div>
            </div>
        );
    }
    
}