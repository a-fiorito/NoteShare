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





export default class CommentsModal extends Component{
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
          return <Comments key={d.id} {...d} /> // dump all the props
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
              <Header />
              <div className="comment-container">
              {this.displayComments()}
              </div>
              <AddComment />
            </div>
        );
    }
  }

class Header extends Component { //pdf on top
  render() {
      return (
        <div className="comments-header">
          <img src="./assets/images/pdf-icon.svg" width="50" height="50" ></img>
          <h4 className="pdf-name">ScrumNotes.pdf</h4>
        </div>
      );
  }
}

class Comments extends Component { //previous comments
  constructor(props){
    super(props);
  }

  render() {
      return (
        <div className="comment">
          <img src="./assets/images/user.svg" width="35" height="35"></img>
          <div className="info">
            <h1>{this.props.user.username}</h1>
            <h2>{this.props.time}</h2>
            <p>{this.props.comment}</p>
          </div>
        </div>

      );
  }
}

class AddComment extends Component { //Add a comment
  render() {
      return (
        <div className="new-comment">
          <h3>Submit a new Comment</h3>
          <textarea></textarea>
          <div className="submit-comment">Post</div>
        </div>
      );
  }
}
