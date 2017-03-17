import React, {Component} from 'react';
import CommentsModal from './CommentsModal';
import SkyLight from 'react-skylight';


/*
Component for the area which will display the available notes on the user dashboard.
*/

//The constant is an array of objects meant to simulate getting the data from the database
let notes = [

  {id : 2, course : "SOEN 341", name : "AGILE NOTES", comments : 22, user: {username: "Anthony"}},
  {id : 3, course : "SOEN 341", name : "SCRUM NOTES", comments : 14, user: {username: "Fozail"}},
  {id : 4, course : "SOEN 331", name : "ALGEBRAIC SPECIFICATION", comments : 15, user: {username: "Daniel"}},
  {id : 5, course : "SOEN 331", name : "PREDICATE LOGIC", comments : 3, user: {username: "Vartan"}},
  {id : 6, course : "SOEN 371", name : "POISSON DISTRIBUTION", comments : 12, user: {username: "Francois"}},
  {id : 7, course : "SOEN 371", name : "BINOMIAL DISTRIBUTION", comments : 7, user: {username: "Charbel"}},
  {id : 8, course : "SOEN 341", name : "AGILE NOTES", comments : 22, user: {username: "Mohamed"}},
  {id : 9, course : "SOEN 341", name : "SCRUM NOTES", comments : 14, user: {username: "Adam"}},
  {id : 10, course : "SOEN 331", name : "ALGEBRAIC SPECIFICATION", comments : 15, user: {username: "Anthony"}},
  {id : 11, course : "SOEN 331", name : "PREDICATE LOGIC", comments : 3, user: {username: "Anthony"}},
  {id : 12, course : "SOEN 371", name : "POISSON DISTRIBUTION", comments : 12, user: {username: "Anthony"}},
  {id : 13, course : "SOEN 371", name : "BINOMIAL DISTRIBUTION", comments : 7, user: {username: "Anthony"}}

];


class DocThumbnail extends Component {
    //use a placeholder image for now

    constructor(props){
      super(props);
    }

    render() {
      var CommentPopup = {
        height: '550px',
        width: '450px',
        margin: '0 auto',
        position: 'absolute',
        left: '0',
        top: '10%',
        right: '0',
        bottom: '0'
        
      };
        return (
          <div>
          <div className = "doc-thumbnail">
            <div className="doc-holder">
              <img src="./assets/images/pdf-icon.svg"></img>
              <p className="course-title">{this.props.name}</p>
            </div>

            <div className="document-info">
              <p>Comments: {this.props.comments}</p>
              <p>by: {this.props.user.username}</p>
            </div>

            <div className="action-buttons">
                <div className="commentbubble"><img src="./assets/commentbubble.png" onClick={() => this.refs.CommentPopup.show()}></img></div>
                <div className="downloadicon"><a href={`http://localhost:3000/pdfs/download/${this.props.user.username}/${this.props.selectedCourse.name + this.props.selectedCourse.number}/${this.props.id}`} target="_blank"><img src="./assets/downloadicon.png"></img></a></div>
            </div>
          </div>
          <SkyLight dialogStyles={CommentPopup} hideOnOverlayClicked ref="CommentPopup">
          <CommentsModal user={this.props.user} docId={this.props.id}/>
          </SkyLight>
        </div>
        );
    }
}

export default class DocumentArea extends Component {

    constructor(props) {
      super(props);
      this.state = {
        documents: notes,
        order: "Newest",
        numPerRow: 6
      };
    }

    displayNotes() {
      if(this.props.documents.length) {
        return this.props.documents.map(d => {
            return <DocThumbnail selectedCourse={this.props.selectedCourse} key={d.id} {...d} /> // dump all the props
        });
      } else if(this.props.selectedCourse == null) {
        return <div className="no-docs">No course selected.</div>;
      } else {
        return <div className="no-docs">No documents :(</div>;
      }
    }

    render() {
        return (
            <div id="doc-wrapper" className="doc-wrapper">
              {this.displayNotes()}
            </div>
        );
    }
}
