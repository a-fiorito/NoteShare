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

    componentWillMount = () => {
    axios.get('/comments/' + this.props.docId)
      .then((resJson) => {this.setState({comments: resJson.data})})
      //.then(() => {this.displayComments()});
    }

    onNewComment = (newComment) => {
      this.setState({comments: this.state.comments.concat(newComment)});
      this.scrollToBottom();
    }
  
    displayComments = () => {
      if(this.state.comments){
        return this.state.comments.map(d => {
            return <Comments 
            key={d.id} 
            username={d.user.username} 
            time={d.createdAt} 
            comment={d.body}
            /> 
        });
      }
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
              <AddComment display={this.onNewComment} user={this.props.user} docId={this.props.docId}/>
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
      commentToUpload: '',
    };
  }

  handleChange = (e) => {
    this.setState({commentToUpload: e.target.value});
  }

  handleSubmit = (e) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    let comment = {
      commentBody : this.state.commentToUpload,
      userId : this.props.user.id,
      documentId : this.props.docId,
    };

    axios.post('/comments', comment)
     .then((response) => 
        this.props.display([response.data]))
     .catch(function (error){
        console.log(error);
    })
    this.setState({commentToUpload: ''});
  }

  render() {
      return (
        <form className="new-comment" onSubmit={this.handleSubmit}>
          <h3>Submit a new Comment</h3>
          <textarea 
            value = {this.state.commentToUpload}
            onChange = {this.handleChange}
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
