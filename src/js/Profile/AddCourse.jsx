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

    onChange = (e) => {
        // update input field
        this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }

    onKeyPress = (e) => {
        if(e.key == "Enter") {
            e.preventDefault();
            this.add();
        }
    }

    add = () => {
        this.props.add(this.state, this.props.error ? 'true' : 'false');
    }

    render() {
        return (
            <div className="add-course">
                <div className="title">Enter course name and number.</div>
                <label>Course Name</label>
                <input ref={(input) => { this.courseInput = input; }} onChange={this.onChange} name="name" type="text" />
                <label>Course Number</label>
                <input onKeyPress={this.onKeyPress} onChange={this.onChange} name="number" type="text" />
                {this.props.error && <p>{this.props.error}</p>}
                <div className="action-buttons">
                    <div className="cancel" onClick={this.props.cancelled.bind(this)}>{this.props.error ? 'No' : 'Cancel'}</div>
                    <div className="add" onClick={this.add}>{this.props.error ? 'Yes' : 'Add'}</div>
                </div>
            </div>
        );
    }
    
}