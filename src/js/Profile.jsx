import React, { Component } from 'react';
import DocumentArea from './DocumentArea';// have a doc area showing notes that you uploaded
import Button from './Button';
import CourseModal from './CourseModal';
import SkyLight from 'react-skylight';

/*
Profile component which should appear when a user clicks on the 'view profile' button
*/

const user = { id: '2', fname: 'Daniel', lname: 'Stroppolo', username: 'dstroppolo', type: 'student' };


class Name extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="name-container">
                <h1>{this.props.fname} {this.props.lname}</h1>
                <h2>{this.props.username} | {this.props.type}</h2>
            </div>
        );
    }
}

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDocuments: false,
            isAdding: false
        }
    }

    toggleBar = (e) => {
        this.setState({showDocuments: !this.state.showDocuments});
    }

    addClass = () => {
        this.setState({isAdding: true});
    }

    /*My idea for this section is to eventually add a DocumentArea which displays
    the notes that you have uploaded, so you can delete them? or update them? For
    example, for the thumbnail component have a state called edit where these
    options appear.
    feel free to remove the DocumentArea, I just didn't know what else to put on
    the page.*/
    render() {
        
        var CoursePopup = {
        height: '350px',
        width: '450px',
        margin: '0 auto',
        position: 'absolute',
        left: '0',
        top: '10%',
        right: '0',
        bottom: '0'
      };

        return (
            <div className='profile-area'>
                <div className="profile">
                    <div className='profile-top'>
                        <div className="name-image-container">
                            <img src="/assets/images/user.svg" />
                            <Name {...user} />{/*pass the user object we will eventually get from the db*/}
                        </div>
                        <div className='button-wrapper'>
                            {/*<Button label="Add a note" />*/}
                            <Button label="Add a class" func={() => this.refs.simpleDialog.show()} /*you will pass the action here eventually action={} */ />
                            <SkyLight dialogStyles={CoursePopup} hideOnOverlayClicked ref="simpleDialog">
                            {this.state.isAdding && <CourseModal />}<CourseModal />
                            </SkyLight>
                        </div>
                    </div>
                    <div className="profile-body">
                        <div className="bibliography">
                            <h3>Bibliography</h3>
                        </div>

                        <div className="statistics">
                            <h3>Statistics</h3>
                        </div>
                        <div className="document-container">
                            <div onClick={this.toggleBar} className="toggle-bar"><h3>Uploaded Notes</h3><img className={this.state.showDocuments && "show"} src="/assets/images/indicator.svg" /></div>
                            {this.state.showDocuments && <DocumentArea documents={[]} selectedCourse={true} />}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
