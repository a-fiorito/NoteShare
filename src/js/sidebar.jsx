import React, { Component } from 'react';

const courses = [
    {id: 0, name: "COEN", number: "311"},
    {id: 1,name: "SOEN", number: "346"},
    {id: 2,name: "ELEC", number: "273"},
    {id: 3,name: "COEN", number: "311"},
    {id: 4,name: "SOEN", number: "346"},
    {id: 5,name: "ELEC", number: "273"},
    {id: 6,name: "COEN", number: "311"},
    {id: 7,name: "SOEN", number: "346"},
    {id: 8,name: "ELEC", number: "273"},
    {id: 9,name: "COEN", number: "311"},
    {id: 10,name: "SOEN", number: "346"},
    {id: 11,name: "ELEC", number: "273"},
    {id: 12,name: "COEN", number: "311"},
    {id: 13,name: "SOEN", number: "346"},
    {id: 14,name: "ELEC", number: "273"},
    {id: 15,name: "COEN", number: "311"},
    {id: 16,name: "SOEN", number: "346"},
    {id: 17,name: "ELEC", number: "273"}
];

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: courses,
            selectedCourse: null
        };
    }

    selectCourse = (course) => {
        this.setState({selectedCourse: course});
    }

    loadCourses() {
        return this.state.courses.map((c, i) => {
            let className = "";
            if(c.id == this.state.selectedCourse) {
                className="selected";
            }
            return <Course isSelected={className} key={i} {...c} selectCourse={this.selectCourse}/>;
        });
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

class Course extends Component {

    selectCourse = () => {
        // pass name for now, pass id later
        this.props.selectCourse(this.props.id);
    }

    render() {
        return <li onClick={this.selectCourse} className={this.props.isSelected}>{`${this.props.name} ${this.props.number}`}</li>;
    }
}

export default Sidebar;