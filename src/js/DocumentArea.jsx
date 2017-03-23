import React, {Component} from 'react';
import CommentsModal from './CommentsModal';
import axios from 'axios';


/*
Component for the area which will display the available notes on the user dashboard.
*/



class DocThumbnail extends Component {
    //use a placeholder image for now

    constructor(props){
      super(props);
    }

    showModal = () => {
      this.props.showComments({
        user: this.props.user,
        docId: this.props.document.id,
        docName: this.props.document.name,
        closeModal: this.closeModal
      });
    }

    closeModal = () => {
      this.props.closeModal();
    }

    deleteDocument = (pos, document) => {
      console.log(this.props.user);
      axios.post('/pdfs/delete', {
        user: document.user,
        document: document
      });
      this.props.deleteDocument(pos);

    }

    render() {
        return (
          <div>
          <div className="doc-thumbnail">
            {this.props.editing && <div onClick={this.deleteDocument.bind(null, this.props.pos, this.props.document)} className="delete-doc"><i className="fa fa-times" aria-hidden="true"></i></div>}
            <div className="doc-holder">
              <img src="/assets/images/pdf-icon.svg"></img>
              <p className="course-title">{this.props.document.name}</p>
              <div className="action-buttons">
                <div className="downloadicon"><a href={`http://localhost:3000/pdfs/download/${this.props.document.user.username}/${this.props.selectedCourse.name + this.props.selectedCourse.number}/${this.props.document.id}`} target="_blank"><img src="/assets/downloadicon.png"></img></a></div>
                <div className="commentbubble"><img src="/assets/commentbubble.png" onClick={this.showModal}></img></div>
              </div>
            </div>

            <div className="document-info">
              <p>Comments: {this.props.document.commentsCount}</p>
              <p>by: {this.props.document.user.username}</p>
            </div>
          </div>
        </div>
        );
    }
}

export default class DocumentArea extends Component {

    constructor(props) {
      super(props);
      this.state = {
        modalInfo: {docId: 0}
      };
    }

    showComments = (modalInfo) => {
        let location = this.context.router.getCurrentLocation().pathname;
        this.context.router.push(`${location}/${modalInfo.docName}/${modalInfo.docId}`);
        this.setState({modalInfo: modalInfo})
    }

    hideComments = () => {
        this.context.router.goBack();
    }

    displayNotes() {
      if(this.props.documents.length) {
        return this.props.documents.map((d, i) => {
            return <DocThumbnail deleteDocument={this.props.deleteDocument} pos={i} editing={this.props.editing} showComments={this.showComments} selectedCourse={this.props.selectedCourse} key={d.id} document={d}/> // dump all the props
        });
      } else if(this.props.selectedCourse == null) {
        return <div className="no-docs">No course selected.</div>;
      } else {
        return <div className="no-docs">No documents :(</div>;
      }
    }

    render() {
        return (
            <div className="doc-area">
              <div id="doc-wrapper" className="doc-wrapper">
                {this.displayNotes()}
              </div>
            <CommentsModal closeModal={this.hideComments} params={this.props.params} user={this.props.user} />
            </div>
        );
    }

    static contextTypes = {
      router: React.PropTypes.object.isRequired
    }
}
