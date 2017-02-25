import React, { Component } from 'react';
import Button from './Button';

export default class Comments extends Component{
  render() {
      return (
        <div className="comment-section">
              <Pdf />
              <OtherComments />
              <AddComment />
        </div>
      );
  }
}

class Pdf extends Component { //pdf on top
  render() {
      return (
        <div className="pdf-container">
        <center>
          <img src="./assets/images/pdf-icon.svg" width="50" height="50" ></img>
          <h4 className="pdf-name">ScrumNotes.pdf</h4>
        </center>
        </div>
      );
  }
}

class OtherComments extends Component { //previous comments
  render() {
      return (
        <div className="comment-container">
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        <Cmt
            username="Adam"
            time="2 months ago"
            body="Love these notes!"
        />
        </div>
      );
  }
}

const Cmt = ({photo, username,time,body}) => {
    return (
        <div className="cmt">
            <img src="./assets/images/user.svg" width="35" height="35"></img>
            <h1>{username}</h1>
            <h2>{time}</h2>
            <p>{body}</p>
        </div>
    );
}

class AddComment extends Component { //Add a comment
  render() {
      return (
        <div className="cmtBox">
        <img src="./assets/images/user.svg" width="35" height="35"></img>
          <form method="post">
          Comment:<br />
          <textarea name='comment' id='comment'></textarea><br />

          <input type='hidden' name='articleid' id='articleid' value='<? echo $_GET["id"]; ?>' />

          <input type='submit' value='Post' />
          </form>
        </div>
      );
  }
}
