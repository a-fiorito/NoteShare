import React, { Component } from 'react';

class Sidebar extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * sets the selected course when user clicks on sidebar
     */
    selectCourse = (course) => {
        let newVal = course;
        if(this.props.selectedCourse && course.id == this.props.selectedCourse.id) {
            newVal = null;
        }
        this.props.selectCourse(newVal);
    }

    loadCourses() {
        if(this.props.courses.length) {
            return this.props.courses.map((c, i) => {
                let className = "";
                if(this.props.selectedCourse && c.id == this.props.selectedCourse.id) {
                    className="selected";
                }
                return <Course isSelected={className} key={i} course={c} selectCourse={this.selectCourse}/>;
            });
        } else {
            return this.props.isLoading ? null : <li className="warning">You belong to no courses. Please add a course from your profile.</li>
        }
    }

    render() {
        return (
            <div className="sidebar">
                <h2>Courses</h2>
                <div>
                <ul>
                    {this.loadCourses()}
                </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;

export class Course extends Component {

    selectCourse = () => {
        this.props.selectCourse(this.props.course);
    }

    render() {
        return <li onClick={this.selectCourse} className={this.props.isSelected}>{`${this.props.course.name} ${this.props.course.number}`}</li>;
    }
}
