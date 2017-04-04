import React, { Component } from 'react';
import CommentsModal from './CommentsModal';
import axios from 'axios';

export default class DocumentArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalInfo: { docId: 0 }
        };
    }

    showComments = (modalInfo) => {
        let location = this.context.router.getCurrentLocation().pathname;
        this.context.router.push(`${location}/${modalInfo.docName}/${modalInfo.docId}`);
        this.setState({ modalInfo: modalInfo });
    }

    hideComments = () => {
        this.context.router.goBack();
    }

    updateDocumentName = (name, pos) => {
        this.props.updateDocumentName(name, pos);
    }

    displayNotes() {
        if (this.props.documents.length) {
            return this.props.documents.map((d, i) => {
                return (
                    <DocThumbnail key={d.id}
                        deleteDocument={this.props.deleteDocument}
                        updateDocumentName={this.updateDocumentName} 
                        pos={i} 
                        editing={this.props.editing} 
                        showComments={this.showComments} 
                        selectedCourse={this.props.selectedCourse}  
                        document={d} 
                    />
                );
            });
        } else if (this.props.selectedCourse == null) {
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

/**
 * Component for the area which will display the available notes on the user dashboard.
 */
export class DocThumbnail extends Component {
    constructor(props) {
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

    /**
     * Delete document from the db
     */
    deleteDocument = (pos, document) => {
        axios.post('/pdfs/delete', {
            user: document.user,
            document: document
        });
        this.props.deleteDocument(pos);
    }

    updateDocumentName = (e) => {
        this.props.updateDocumentName(e.target.value, this.props.pos);
    }

    handleBlur = () => {
        axios.post('/pdfs/rename', {
            id: this.props.document.id,
            name: this.props.document.name
        });
    }

    handleEnter = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    }

    render() {
        let { pos, document} = this.props;
        let downloadLink = `/pdfs/download/${document.user.username}/${document.course.name + document.course.number}/${document.id}`;
        return (
            <div>
                <div className="doc-thumbnail">
                    {this.props.editing &&
                        <div className="delete-doc"
                            onClick={this.deleteDocument.bind(null, pos, document)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>}
                    <div className="doc-holder">
                        <img src="/assets/images/icons/pdf-icon.svg"></img>
                        {this.props.editing ? <textarea onBlur={this.handleBlur} onChange={this.updateDocumentName} value={document.name} onKeyPress={this.handleEnter} maxLength="30" /> : <p className="course-title">{document.name}</p>}
                        <div className="action-buttons">
                            <div className="downloadicon">
                                <a href={downloadLink} target="_blank"><img src="/assets/images/icons/downloadicon.png"></img></a></div>
                            <div className="commentbubble"><img src="/assets/images/icons/commentbubble.png" onClick={this.showModal}></img></div>
                        </div>
                    </div>

                    <div className="document-info">
                        <p>Comments: {document.commentsCount}</p>
                        <p>by: {document.user.username}</p>
                    </div>
                </div>
            </div>
        );
    }
}
