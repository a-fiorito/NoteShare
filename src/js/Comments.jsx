import React, { Component } from 'react';


let comments = [

  {id : 2, comment : "Good stuff!", user: {username: "Anthony"}, time: "May 22th, 2016"},
  {id : 3, comment : "Works out very well!", user: {username: "Fozail"}, time: "May 23th, 2016"},
  {id : 4, comment : "I love how you explain this stuff!", user: {username: "Daniel"}, time: "May 24th, 2016"},
  {id : 5, comment : "Great work!", user: {username: "Vartan"}, time: "May 25th, 2016"},
  {id : 6, comment : "Good job!", user: {username: "Francois"}, time: "May 26th, 2016"},
  {id : 7, comment : "Helped me a lot", user: {username: "Charbel"}, time: "May 27th, 2016"},
  {id : 8, comment : "Lovely!", user: {username: "Mohamed"}, time: "May 30th, 2016"},


];





export default class Comments extends Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: comments,
      order: "Newest",
      numPerRow: 5,
      isOpen: false,
    }
  }
    displayComments() {
      return this.state.comments.map(d => {
          return <OtherComments key={d.id} {...d} /> // dump all the props
      });
    }
    openComments = () => {
      this.setState({isOpen: true});
    }

    closeComments = () => {
      this.setState({isOpen: false});
    }

    render() {
        return (
            <div className="comment-section">
              <Pdf />
              <div className="comment-container">
              {this.displayComments()}
              </div>
              <AddComment />
            </div>
        );
    }
  }

  class BlockingDiv extends Component{

    constructor(props){
      super(props);
    }

    render() {
      return(
        <div className = 'blockingDiv' onClick={this.props.close}> </div>
      )
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
  constructor(props){
    super(props);
  }

  render() {
      return (
        <div className="cmt">
        <img src="./assets/images/user.svg" width="35" height="35"></img>
        <h1>{this.props.user.username}</h1>
        <h2>{this.props.time}</h2>
        <p>{this.props.comment}</p>
        </div>

      );
  }
}

/*const Cmt = ({photo, username,time,body}) => {
    return (
        <div className="cmt">
            <img src="./assets/images/user.svg" width="35" height="35"></img>
            <h1>{username}</h1>
            <h2>{time}</h2>
            <p>{body}</p>
        </div>
    );
}*/

class AddComment extends Component { //Add a comment
  render() {
      return (
        <div className="cmtBox">
        <img src="./assets/images/user.svg" width="35" height="35"></img>
          <form method="post">
          Comment:<br />
          <textarea name='comment' id='comment'></textarea><br />

          <input type='hidden' name='articleid' id='articleid' value='<? echo $_GET["id"]; ?>' />

          <input type='submit' id='post' value='Post' />
          </form>
        </div>
      );
  }
}
