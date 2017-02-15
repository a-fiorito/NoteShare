import React, {Component} from 'react';
import DocumentArea from './DocumentArea';// have a doc area showing notes that you uploaded
import Button from './Button';


/*
Profile component which should appear when a user clicks on the 'view profile' button
*/

const user = {id: '2', fname: 'Daniel', lname: 'Stroppolo', username: 'dstroppolo', type: 'student'};


class Name extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <h1>{this.props.fname} {this.props.lname}</h1>
        <h2>{this.props.username} | {this.props.type}</h2>
      </div>
    );
  }
}

class Explanation extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className='explanation'>
        <p>Welcome to your profile! From here, you can view notes you have uploaded, upload new notes and create or join classes.</p>
      </div>
    );
  }
}

export default class Profile extends Component {
  constructor(props){
    super(props);
  }

  displayButton(label, func){
    return <Button label={label} func={func}/>
  }

  //user object as a parameter
  displayName(user){
    return <Name {...user} />
  }

  displayExplanation(){
    return <Explanation />
  }

  /*My idea for this section is to eventually add a DocumentArea which displays
  the notes that you have uploaded, so you can delete them? or update them? For
  example, for the thumbnail component have a state called edit where these
  options appear.
  feel free to remove the DocumentArea, I just didn't know what else to put on
  the page.*/
  render() {
    return(
      <div className='profile-area'>
        <div className='name-button-wrapper'>
          {this.displayName(user)}{/*pass the user object we will eventually get from the db*/}
          <div className='button-wrapper'>
            {this.displayButton('Add a note', 'doc')}
            {this.displayButton('Add or join a class', 'class')}
          </div>
        </div>
        {this.displayExplanation()}
        <DocumentArea />
      </div>

    )
  }
}
