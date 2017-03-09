import React, { Component } from 'react';
import Button from './Button';

export default class CourseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false
        }
    }

    openCourses = () => {
        this.setState({isAdding: true});
    }

    closeCourses = () => {
        this.setState({isAdding: false});
    }

    validateForm = () => {
        var courseName = document.getElementById("courseName").value;
        var courseNumber = document.getElementById("courseNumber").value;

        if ((courseName == "") || (courseNumber == "")) {
            alert("You have to enter both a course name and a course number.");
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        return (
            <div className>
                <form onSubmit={this.validateForm}>
                    <p className="header">Please enter a valid course name:</p>
                    <input className="course" type="text" id="courseName" placeholder="e.g. SOEN, COEN, etc." />
                    <p className="header">Please enter a valid course number:</p>
                    <input className="course" type="text" id="courseNumber" placeholder="e.g. 341, 311, etc." />
                    <br/><br/>
                    <input className="courseButton" type="submit" value="Submit" />
                    <input className="courseButton" type="reset" value="Clear" />
                    <br/>
                </form>
            </div>
        );
    }
}