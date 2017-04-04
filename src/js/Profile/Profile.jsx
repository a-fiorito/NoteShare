import React, { Component } from 'react';
import DocumentArea from '../DocumentArea/DocumentArea';// have a doc area showing notes that you uploaded
import Button from '../Abstract/Button';
import AddCourse from './AddCourse';
import axios from 'axios';
import auth from '../utils/auth';



/**
 * Profile component which should appear when a user clicks on the 'view profile' button
 */
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
            user: null,
            editing: false,
            changesMade: false,
            error: false

        };
    }

    componentWillReceiveProps(nextProps) {
        // if a different user profile is loaded, get updated stats
        if (this.props.params.username != nextProps.username) {
            axios.get(`/stats/${nextProps.params.username}`)
                .then(res => {
                    this.setState({ ...res.data });
                })
                .catch(err => {});
        }
    }

    componentDidMount() {
        // get profile stats
        axios.get(`/stats/${this.props.params.username}`)
            .then(res => {
                this.setState({ ...res.data });
            })
            .catch(err => {});

    }

    // need to refactor these
    updateName = (name) => { this.setState({ changesMade: true, user: { ...this.state.user, name: name } }); }
    updateBio = (e) => { this.setState({ changesMade: true, bio: e.target.value }); }
    updateType = (t) => { this.setState({ changesMade: true, user: { ...this.state.user, type: t } }); }

    toggleBar = (e) => {
        this.setState({ showDocuments: !this.state.showDocuments });
    }

    showAddPopup = () => {
        this.setState({ showAdd: true });

    }

    showEditPopup = () => {
        this.setState({ showEdit: true });
    }

    addCourse = (c, check) => {
        // user should enter a course name and number
        if (c.name && c.number) {
            axios.post(`/courses/${check}`, {
                course: c,
                user: this.props.user
            })
            .then(res => {
                if(res.data.error) {
                    this.setState({error: res.data.error});
                } else {
                    this.setState({ showAdd: false, courses: this.state.courses.concat([res.data]), error: null });
                }
            })
            .then(err => {});
        } else {
            console.log('invalid');
        }
    }

    addCourseCancelled = () => {
        this.setState({ showAdd: false, error: false });
    }

    editProfileCancelled = () => {
        this.setState({ showEdit: false });
    }

    deleteDocument = (pos) => {
        let documents = this.state.documents.slice();
        documents.splice(pos, 1);
        this.setState({ documents: documents });
    }

    deleteCourse = (pos, course) => {
        axios.delete(`/courses/${this.props.user.id}/${course.id}`)
        .then(() => {
            if(localStorage.getItem('selectedCourse') && course.id == JSON.parse(localStorage.getItem('selectedCourse')).id) {
                localStorage.removeItem('selectedCourse');
            }
            let courses = this.state.courses.slice();
            courses.splice(pos, 1);
            this.setState({ courses: courses });
        })
        .catch(err => {});
    };

    updateDocumentName = (name, pos, sendToDB=false) => {
        if(!sendToDB) {
            let documents = this.state.documents.slice();
            documents[pos].name = name;
            this.setState({documents: documents});
        } else {
            // make network request
        }
    }

    loadCourses() {
        return this.state.courses.map((c, i) => {
            return (
                <div key={i} className="subcourses">
                    <div>{`${c.name} ${c.number}`}</div>
                    {this.state.editing &&
                        <div className="delete-course"
                            onClick={this.deleteCourse.bind(null, i, c)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>}
                </div>
            );
        });
    }

    toggleEdit = () => {
        if (this.state.editing && this.state.changesMade) {
            axios.post('/authenticate/update', {
                username: this.state.user.username,
                name: this.state.user.name,
                bio: this.state.bio,
                type: this.state.user.type
            })
                .then(res => {
                    const token = res.data.token;
                    localStorage.setItem('jwtToken', token);
                    auth.setAuthToken(token);
                    this.props.renewAuth(auth.getCredentials(token));
                })
                .catch(err => {});
        }
        this.setState({ changesMade: false, editing: !this.state.editing });
    }

    render() {
        return (
            <div className='profile-area'>
                <div className="profile">
                    <div className='profile-top'>
                        <div className="name-image-container">
                            <img src="/assets/images/icons/user.svg" />
                            <Name updateType={this.updateType} updateName={this.updateName} {...this.state.user} editing={this.state.editing} />{/*pass the user object we will eventually get from the db*/}
                        </div>
                        {/*    <div className="settings-icon"><img src="./assets/settingsicon.png"></img></div> */}
                        <div className='button-wrapper'>
                            <div className="buttons">
                                {this.props.params.username == this.props.user.username && <Button isDisabled={this.state.showAdd} func={this.showAddPopup} label="Add or join a class" />}
                                {this.props.params.username == this.props.user.username && <div onClick={this.toggleEdit} className="edit-profile">{this.state.editing ? "Finish Editing" : "Edit Profile"}</div>}
                            </div>
                            {this.state.showAdd && <AddCourse error={this.state.error} add={this.addCourse} cancelled={this.addCourseCancelled} />}
                        </div>
                    </div>
                    <div className="profile-body">
                        {this.state.editing || this.state.bio ? <div className="bibliography">
                            <h3>Bio</h3>
                            {this.state.editing ? <textarea onChange={this.updateBio} value={this.state.bio || ""}></textarea> : <p>{this.state.bio}</p>}
                        </div> : null}

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
                            <div onClick={this.toggleBar} className="toggle-bar"><h3>Uploaded Notes</h3><img className={this.state.showDocuments && "show"} src="/assets/images/icons/indicator.svg" /></div>
                            {this.state.showDocuments && <DocumentArea updateDocumentName={this.updateDocumentName} deleteDocument={this.deleteDocument} editing={this.state.editing} documents={this.state.documents} selectedCourse={true} user={this.props.user} params={this.props.params} />}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export class Name extends Component {
    constructor(props) {
        super(props);

        this.types = {
            "Student": 0,
            "Teacher": 1,
            "TA": 2
        };
        this.typeShuffle = ["Student", "Teacher", "TA"];
    }

    onChange = (e) => {
        this.props.updateName(e.target.value);
    }

    goLeft = () => {
        let typeNum = this.types[this.props.type];
        let int = typeNum == 0 ? 2 : typeNum - 1;
        this.changeType(this.typeShuffle[int]);
    }

    goRight = () => {
        let typeNum = this.types[this.props.type];
        let int = (typeNum + 1) % 3
        this.changeType(this.typeShuffle[int]);
    }


    changeType = (t) => {
        this.props.updateType(t);
    }

    render() {
        return (
            <div className="name-container">
                {this.props.editing ? <input onChange={this.onChange} name="name" type="text" value={this.props.name} /> : <h1 className="name">{this.props.name || '-'}</h1>}
                <div className="sub-name">
                    <h2>{this.props.username} |</h2>
                    {this.props.editing ?
                        <div className="select">
                            <div onClick={this.goLeft} className="left"><i className="fa fa-angle-left" aria-hidden="true"></i></div>
                            <div className="type">{this.props.type}</div>
                            <div onClick={this.goRight} className="right"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                        </div>
                        : <h2 className="type">{this.props.type || '-'}</h2>}
                </div>
            </div>
        );
    }
}
