import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import CSSTransition from 'react-addons-css-transition-group';

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

  componentWillReceiveProps(nextProps) {
    if(this.props.params.id != nextProps.params.id) {
      if(nextProps.params.id != undefined) {
        axios.get('/comments/' + nextProps.params.id)
        .then((res) => {
          this.setState({comments: res.data});
          this.scrollToBottom();
        })
      }
    }
  }

  componentDidMount() {
    if(this.props.params.id != undefined) {
      axios.get('/comments/' + this.props.params.id)
          .then((res) => {
            this.setState({comments: res.data});
            //this.scrollToBottom();
          })
    }
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
            <div className="comment-area">
            <CSSTransition 
                    transitionName="blocking"
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={500}>
              {this.props.params.id && <div onClick={this.props.closeModal} className="blocking"></div>}
            </CSSTransition>
            <CSSTransition 
                    transitionName="comment-modal"
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={600}>
            {this.props.params.id &&
            <div className="comment-section">
              <div className="top">
                <Header docName={this.props.params.name}/>
                <div onClick={this.props.closeModal} className="close-modal"><i className="fa fa-times" aria-hidden="true"></i></div>
              </div>
              <div className="comment-container">
                {this.displayComments()}
              </div>
              <AddComment updateComments={this.updateComments} user={this.props.user} docId={this.props.params.id}/>
            </div>}
            </CSSTransition>
            </div>
        );
      }
    }

class Header extends Component { //pdf on top
  render() {
      return (
        <div className="comments-header">
          <img src="/assets/images/pdf-icon.svg" width="50" height="50" ></img>
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
          <img src="/assets/images/user.svg" width="35" height="35"></img>
          <div className="info">
            <Link to={`/profile/${this.props.username}`}><h1>{this.props.username}</h1></Link>
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
