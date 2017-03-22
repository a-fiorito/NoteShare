import React, {Component} from 'react';

export default class AddCouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            number: null
        };
    }

    componentDidMount() {
        this.courseInput.focus();
    }

    _onChange = (e) => {
        // update input field
        this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }

    _keyPress = (e) => {
        if(e.key == "Enter") {
            e.preventDefault();
            this.add();
        }
    }

    add = () => {
        this.props.add(this.state);
    }

    render() {
        return (
            <div className="add-course">
                <div className="title">Enter course name and number.</div>
                <label>Course Name</label>
                <input ref={(input) => { this.courseInput = input; }} onChange={this._onChange} name="name" type="text" />
                <label>Course Number</label>
                <input onKeyPress={this._keyPress} onChange={this._onChange} name="number" type="text" />
                <div className="action-buttons">
                    <div className="cancel" onClick={this.props.cancelled.bind(this)}>Cancel</div>
                    <div className="add" onClick={this.add}>Add</div>
                </div>
            </div>
        );
    }
    
}