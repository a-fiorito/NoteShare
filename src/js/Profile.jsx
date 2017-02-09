import React, {Component} from 'react';
import DocumentArea from './DocumentArea';// have a doc area showing notes that you uploaded
import Button from './Button';


/*
Profile component which should appear when a user clicks on the 'view profile' button
*/

const user = {id: '2', fname: 'Daniel', lname: 'Stroppolo', username: 'dstroppolo'};


class Name extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <h1>{this.props.fname} {this.props.lname}</h1>
        <h2>{this.props.username}</h2>
      </div>
    );
  }
}

export default class Profile extends Component {
  constructor(props){
    super(props);
  }

  addNote = () => {
    alert('Adding a note');
  }

  addClass = () => {
    alert('Adding a class');
  }

  //not sure if this is how its done. We pass a function to call as a param
  //set up some examples.
  displayButton(label, action){
    return <Button label={label} function={action} />
  }

  //user object as a parameter
  displayName(user){
    return <Name {...user} />
  }

  render() {
    return(
      <div className='profile-area'>
        <div className='name-button-wrapper'>
          {this.displayName(user)}{/*pass the student object we will eventually get from the db*/}
          <div className='button-wrapper'>
            {this.displayButton('Add a note', this.addNote)}
            {this.displayButton('Add a class', this.addClass)}
          </div>
        </div>
        <DocumentArea />
      </div>

    )
  }
}
