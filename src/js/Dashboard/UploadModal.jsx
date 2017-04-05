import React, { Component } from 'react';
import Button from '../Abstract/Button';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import CSSTransition from 'react-addons-css-transition-group';

class UploadModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            files: [],
            filename: null,
            success: false,
            isUploading: false,
        }
    }

    /**
     * Handle the dragging and dropping of a file onto the modal.
     */
    onDrop = (acceptedFiles, rejectedFiles) => {
        let filename = acceptedFiles[0].name;
        filename = filename.substring(0, 29);
        this.setState({ files: acceptedFiles, filename: filename });
    }

    /**
     * Handles the file uploading of the pdf, only handles one file upload
     */
    onUpload = () => {
        this.setState({ isUploading: true });
        // set timeout to allow for loading circle
        setTimeout(() => {
            // build axios request
            let req = new FormData();
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            let props = ['document', 'courseId', 'courseName', 'userId', 'username', 'fileName'];
            let upload = {
                document: this.state.files[0],
                courseId: this.props.selectedCourse.id,
                courseName: this.props.selectedCourse.name + this.props.selectedCourse.number,
                userId: this.props.user.id,
                username: this.props.user.username,
                fileName: this.state.filename
            };

            props.forEach(p => {
                req.append(p, upload[p]);
            });
            // send axios request
            axios.post('/pdfs/upload', req, config)
                .then((res) => {
                    this.props.updateDocuments(res.data);
                    // set timeout to show success message when uploading
                    setTimeout(() => {
                        this.props.closeModal();
                        this.setState({ success: false, files: [] });
                    }, 700);
                }).catch(function (error) {
                    console.log("error", error); // TODO: add error handling
                });
            this.setState({ isUploading: false, success: true });
        }, 700);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    closeModal = () => {
        this.setState({files: []});
        this.props.closeModal();
    }

    render() {
        let dropStyle = {
            margin: "0", height: "150px", width: "150px",
            border: "2px dashed black", borderRadius: "8px",
            display: "flex", justifyContent: "center", alignItems: "center"
        };
        return (
            <div className='modalComponent'>
                <CSSTransition
                    transitionName="blocking"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    {this.props.showModal && <div className='blockingDiv' onClick={this.closeModal}> </div> /* modal blocking background */}
                </CSSTransition>
                <CSSTransition
                    transitionName="modal"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={600}
                    transitionAppear={true}
                    transitionAppearTimeout={600}>
                    {this.props.showModal && /* modal body */
                        <div className='uploadModal'>
                            <div className="modalTitle">
                                <h1>Drag files to upload.</h1>
                            </div>
                            <div className="modalBody">
                                <Dropzone style={dropStyle} onDrop={this.onDrop} accept={'application/pdf'} multiple={false}>
                                    {!this.state.isUploading && !this.state.success ? (this.state.files.length > 0 ? <img src="./assets/images/icons/pdf-icon.svg"></img>
                                        : <img src="./assets/images/icons/book.svg"></img>) : null}
                                    {this.state.isUploading && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>}
                                    {this.state.success && <div className="success">Success!</div>}
                                </Dropzone>
                                <p>Drag <span>PDF</span> here to upload.</p>
                                {this.state.files.length > 0 && <input name="filename" type="text" value={this.state.filename} onChange={this.onChange} placeholder={"Enter the filename"} maxLength="30" />}
                                <Button isDisabled={!this.state.files.length || this.state.filename.length > 30} className="uploadButton" label="Upload" func={this.onUpload} />
                            </div>
                        </div>}
                </CSSTransition>
            </div>

        );
    }
}

export default UploadModal;