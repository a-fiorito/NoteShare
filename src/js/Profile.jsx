import React, { Component } from 'react';
import DocumentArea from './DocumentArea';// have a doc area showing notes that you uploaded
import Button from './Button';


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
            showDocuments: false
        }
    }

    toggleBar = (e) => {
        this.setState({showDocuments: !this.state.showDocuments});
    }

    /*My idea for this section is to eventually add a DocumentArea which displays
    the notes that you have uploaded, so you can delete them? or update them? For
    example, for the thumbnail component have a state called edit where these
    options appear.
    feel free to remove the DocumentArea, I just didn't know what else to put on
    the page.*/
    render() {
        return (
            <div className='profile-area'>
                <div className="profile">
                    <div className='profile-top'>
                        <div className="name-image-container">
                            <img src="/assets/images/user.svg" />
                            <Name {...user} />{/*pass the user object we will eventually get from the db*/}
                        </div>
                        <div className='button-wrapper'>
                            <Button label="Add a note" />
                            <Button label="Add or join a class" /*you will pass the action here eventually action={} */ />
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
                            {this.state.showDocuments && <DocumentArea />}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
