import React, {Component} from 'react';
import Button from './Button';
import Dropzone from 'react-dropzone';


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

class Upload extends Component {

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
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({files: acceptedFiles});
  }

    render() {
      return(
        <div>
          <Button func={this.openModal}/>{/*open the modal by clicking on the button, close by clicking on background*/}
          {this.state.isOpen && <BlockingDiv display={this.state.isOpen ? 'flex' : 'none'} close={this.closeModal}/>}
          <div className = 'uploadModal' style = {{display: this.state.isOpen ? 'flex' : 'none'}}>
            <div className = "modalTitle">
              <h1>Drag files to upload.</h1>
            </div>
            <div className = "modalBody">
              <Dropzone onDrop={this.onDrop} accept={'application/pdf,image/*'} multiple={true} />
              <p>Drag files here to upload. Accepted formats: PDF, JPG, PNG</p>
                {this.state.files.length > 0 ? <div>
                <div>{this.state.files.map((file, index) => <img key={index} src={file.preview} /> )}</div></div>
                 : <img src="./assets/images/book.svg"></img>}
              <button type = "submit">Upload</button>
            </div>
          </div>
        </div>
      );
    }
}

export default Upload;
