import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import CSSTransition from 'react-addons-css-transition-group';
import filter from '../utils/filter';

export default class CommentsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        // check if the document id has changed
        if (this.props.params.id != nextProps.params.id) {
            // check if the id is idle in case, need to make this better
            if (nextProps.params.id != undefined) {
                axios.get('/comments/' + nextProps.params.id)
                    .then((res) => {
                        this.setState({ comments: res.data });
                        this.scrollToBottom();
                    });
            }
        }
    }

    componentDidMount() {
        if (this.props.params.id != undefined) {
            axios.get('/comments/' + this.props.params.id)
                .then((res) => {
                    this.setState({ comments: res.data });
                    this.scrollToBottom();
                });
        }
    }

    updateComments = (newComment) => {
        let comment = { ...newComment };
        comment.user = this.props.user; // add user to the new comment
        this.setState({ comments: this.state.comments.concat(comment) });
        this.scrollToBottom();
    }

    displayComments = () => {
        return this.state.comments.map((d, index) => {
            return <Comment
                key={index}
                username={d.user.username}
                time={d.createdAt}
                comment={d.body}
            />
        });
    }

    openComments = () => {
        this.setState({ isOpen: true });
    }

    closeComments = () => {
        this.setState({ isOpen: false });
    }
    /**
     * Scroll to the bottom of the comment section
     */
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
                    {this.props.params.id && <div onClick={this.props.closeModal} className="blocking"></div> /* blocking background for modal */}
                </CSSTransition>
                <CSSTransition
                    transitionName="comment-modal"
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={600}>
                    {this.props.params.id && /* modal body */
                        <div className="comment-section">
                            <div className="top">
                                <Header docName={this.props.params.name} />
                                <div onClick={this.props.closeModal} className="close-modal"><i className="fa fa-times" aria-hidden="true"></i></div>
                            </div>
                            <div className="comment-container">
                                {this.displayComments()}
                            </div>
                            <AddComment updateComments={this.updateComments} user={this.props.user} docId={this.props.params.id} />
                        </div>}
                </CSSTransition>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <div className="comments-header">
                <img src="/assets/images/icons/pdf-icon.svg" width="50" height="50" ></img>
                <h4 className="pdf-name">{this.props.docName}</h4>
            </div>
        );
    }
}

export class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment">
                <img src="/assets/images/icons/user.svg" width="35" height="35"></img>
                <div className="info">
                    <Link to={`/profile/${this.props.username}`}><h1>{this.props.username}</h1></Link>
                    <h2>{this.props.time}</h2>
                    <p>{filter(this.props.comment)}</p>
                </div>
            </div>

        );
    }
}

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        };
    }

    /**
     * Update with new comment
     */
    handleChange = (e) => {
        this.setState({ comment: e.target.value });
    }

    /**
     * Submit a comment
     */
    handleSubmit = (e) => {
        let comment = {
            commentBody: this.state.comment,
            userId: this.props.user.id,
            documentId: this.props.docId,
        };

        axios.post('/comments', comment)
            .then((res) => {
                this.props.updateComments(res.data);
            });
        this.setState({ comment: '' });
    }

    /**
     * Make sure the comment is submitted when the user hits enter
     */
    handleEnter = (e) => {
        if (e.key == "Enter") {
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
                <div onClick={this.handleSubmit} className="submit-comment">Submit</div>
            </form>
        );
    }
}
