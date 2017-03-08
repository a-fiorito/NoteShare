import React, {Component} from 'react';
import Button from './Button';
import Dropzone from 'react-dropzone';
import axios from 'axios';

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

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      files: []
    }
  }

  openModal = () => {
    this.setState({isOpen: true});
  }

  closeModal = () => {
    this.setState({isOpen: false});
    this.state.files.length > 0 && this.setState({files: []}); //if we close the modal without uploading files, the files do not persist in the modal
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
  }

  //for now you can only upload one file at a time. I will change this hardcoded stuff soon.
  onUpload = () => {

    let req = new FormData();
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    let upload = {
      document : this.state.files[0],
      courseId : this.props.selectedCourse.id,
      courseName : this.props.selectedCourse.name + this.props.selectedCourse.number,
      userId : this.props.user.id,
      username : this.props.user.username ,
      fileName : this.state.files[0].name
    };

    req.append('document', upload.document);
    req.append('courseId', upload.courseId);
    req.append('courseName', upload.courseName);
    req.append('userId', upload.userId);
    req.append('username', upload.username);
    req.append('fileName', upload.fileName);

    axios.post('pdfs/upload', req, config
     ).then(function (response) {
      alert( 'Going to come up with a nicer way to thank them for uploading.');
    }).catch(function (error){
      console.log(error);
    })
    this.closeModal();
  }

    render() {
      return(
        <div className='modalComponent'>
          {this.props.canUpload && <Button func={this.openModal} label={"Upload a document"}/>} {/*open the modal by clicking on the button, close by clicking on background*/}
          {this.state.isOpen && <BlockingDiv display={this.state.isOpen ? 'flex' : 'none'} close={this.closeModal}/>}
          <div className = 'uploadModal' style = {{display: this.state.isOpen ? 'flex' : 'none'}}>
            <div className = "modalTitle">
              <h1>Drag files to upload.</h1>
            </div>
            <div className = "modalBody">
              <Dropzone onDrop={this.onDrop} accept={'application/pdf'} multiple={false} />
              <p>Drag files here to upload. Accepted format: PDF</p>
                {this.state.files.length > 0 ? <img src="./assets/images/pdf-icon.svg"></img>
                : <img src="./assets/images/book.svg"></img>}
              <Button className="uploadButton" label = "Upload" func={this.onUpload} />
            </div>
          </div>
        </div>
      );
    }
}

export default Modal;
