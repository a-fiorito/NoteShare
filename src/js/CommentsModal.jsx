import React, { Component } from 'react';
import axios from 'axios';

export default class CommentsModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      order: "Newest",
      numPerRow: 5,
      isOpen: false,
      newComments: false,
      comments: [],
    }
  }

    componentDidMount() {
    }
    componentWillMount() {
    axios.get('/comments/' + this.props.docId)
      .then((res) => {
        this.setState({comments: res.data});
        this.scrollToBottom();
      })
      //.then(() => {this.displayComments()});
    }

    updateComments = (newComment) => {
      let comment = {...newComment};
      comment.user = this.props.user;
      this.setState({comments: this.state.comments.concat(comment)});
      this.scrollToBottom();
    }
    
    //I couldn't find a more elegant solution than this. When a new comment are stored in the comments[] array, it does not store the username.
    //thus it would throw an error saying d.user.username is undefined. Maybe I'm not doing something right in the implementation but I left comments
    //for my old implementation if you want to take a look.
    displayComments = () => {
      //OLD: did not have a try/catch
        return this.state.comments.map((d, index) => {
            return <Comments 
            key={index} 
            username={d.user.username} 
            time={d.createdAt} 
            comment={d.body}
            /> 
        });
    }
    
    openComments = () => {
      this.setState({isOpen: true});
    }

    closeComments = () => {
      this.setState({isOpen: false});
    }

    scrollToBottom = () => {
      let comments = document.getElementsByClassName("comment-container");
      comments = comments[0];
      comments.scrollTop = comments.scrollHeight;
    }

    render() {
        return (
            <div className="comment-section">
              <Header docName={this.props.docName}/>
              <div className="comment-container">
                {this.displayComments()}
              </div>
              <AddComment updateComments={this.updateComments} user={this.props.user} docId={this.props.docId}/>
            </div>
        );
      }
    }

class Header extends Component { //pdf on top
  render() {
      return (
        <div className="comments-header">
          <img src="./assets/images/pdf-icon.svg" width="50" height="50" ></img>
          <h4 className="pdf-name">{this.props.docName}</h4>
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
            <h1>{this.props.username}</h1>
            <h2>{this.props.time}</h2>
            <p>{this.props.comment}</p>
          </div>
        </div>

      );
  }
}

class AddComment extends Component { //Add a comment
  constructor(props){
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleChange = (e) => {
    this.setState({comment: e.target.value});
  }

  handleSubmit = (e) => {
    let comment = {
      commentBody : this.state.comment,
      userId : this.props.user.id,
      documentId : this.props.docId,
    };

    axios.post('/comments', comment)
     .then((res) => {
        this.props.updateComments(res.data);
     });
    this.setState({comment: ''});
  }

  handleEnter = (e) => {
    if(e.key == "Enter") {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  render() {
      return (
        <form className="new-comment" onSubmit={this.handleSubmit}>
          <h3>Submit a new Comment</h3>
          <textarea 
            value={this.state.comment}
            onChange={this.handleChange}
            onKeyPress={this.handleEnter}
            />
          <div 
            onClick = {this.handleSubmit}
            className = "submit-comment"
          >
            Submit
          </div>
       </form>
      );
  }
}
