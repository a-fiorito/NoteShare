import React, { Component } from 'react';
import DocumentArea from './DocumentArea';// have a doc area showing notes that you uploaded
import Button from './Button';
import AddCourse from './AddCourse';
import axios from 'axios';


/*
Profile component which should appear when a user clicks on the 'view profile' button
*/

//const user = { id: '2', fname: 'Daniel', lname: 'Stroppolo', username: 'dstroppolo', type: 'student' };


class Name extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="name-container">
                <h1>{this.props.name || '-'}</h1>
                <h2>{this.props.username} | {this.props.type || '-'}</h2>
            </div>
        );
    }
}

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDocuments: false,
            showAdd: false,
            documents: [],
            statistics: {
                numberOfComments: null,
                numberOfDocuments: null,
            },
            courses: [],
            bio: "",
            user: null

        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.params.username != nextProps.username) {
            console.log("made it")
            axios.get(`/stats/${nextProps.params.username}`)
            .then(res => {
                console.log(res.data);
                this.setState({...res.data});
            })
        }
    }

    componentDidMount() {
        axios.get(`/stats/${this.props.params.username}`)
        .then(res => {
            this.setState({...res.data});
        })

    }

    toggleBar = (e) => {
        this.setState({ showDocuments: !this.state.showDocuments });
    }

    showAddPopup = () => {
        this.setState({ showAdd: true });

    }

    addCourse = (c) => {
        if (c.name && c.number) {
            axios.post('/courses', {
                course: c,
                user: this.props.user
            })
            .then(res => {
                this.setState({ showAdd: false, courses: this.state.courses.concat([res.data])});
            })
        } else {
            console.log('invalid')
        }
    }

    addCourseCancelled = () => {
        this.setState({ showAdd: false });
    }

    loadCourses() {
        return this.state.courses.map((c, i) => {
            return (
                <div key={i} className="subcourses">
                    {`${c.name} ${c.number}`}
                </div>
            )
        });
    }

    toggleEdit = () => {
        this.setState({editing: !this.state.editing});
    }

    render() {
        return (
            <div className='profile-area'>
                <div className="profile">
                    <div className='profile-top'>
                        <div className="name-image-container">
                            <img src="/assets/images/user.svg" />
                            <Name {...this.state.user} />{/*pass the user object we will eventually get from the db*/}
                        </div>
                        <div className='button-wrapper'>
                            <div className="buttons">
                                {this.props.params.username == this.props.user.username && <Button isDisabled={this.state.showAdd} func={this.showAddPopup} label="Add or join a class"/>}
                                {this.props.params.username == this.props.user.username && <div onClick={this.toggleEdit} className="edit-profile">{this.state.editing ? "Finish Editing" : "Edit Profile"}</div>}
                            </div>
                            {this.state.showAdd && <AddCourse add={this.addCourse} cancelled={this.addCourseCancelled} />}
                        </div>
                    </div>
                    <div className="profile-body">
                        {this.state.bio && <div className="bibliography">
                            <h3>Bio</h3>
                            <p>{this.state.bio}</p>
                        </div>}

                        <div className="statistics">
                            <h3>Statistics</h3>
                            <p>Number of notes uploaded: {this.state.statistics.numberOfDocuments} </p>
                            <p>Number of comments made: {this.state.statistics.numberOfComments}</p>
                        </div>

                        <div className="my-courses">
                            <h3>Courses</h3>
                            <div className="course-list">
                                {this.loadCourses()}
                            </div>
                        </div>
                        <div className="document-container">
                            <div onClick={this.toggleBar} className="toggle-bar"><h3>Uploaded Notes</h3><img className={this.state.showDocuments && "show"} src="/assets/images/indicator.svg" /></div>
                            {this.state.showDocuments && <DocumentArea editing={this.state.editing} documents={this.state.documents} selectedCourse={true} user={this.props.user} params={this.props.params} />}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
