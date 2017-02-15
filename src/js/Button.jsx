import React, {Component} from 'react';

export default class Button extends Component {

  constructor(props){
    super(props);
    this.state = {
      func: this.props.func
    }
  }

  //I figured we can handle the clicks from here (for now at least)
  //please let me know how you were planning on handling it
  handleClick = () => {
    switch(this.state.func){
      case 'doc': this.addDoc();
        break;
      case 'class': this.addClass();
        break;
    }
  }

  addDoc = () => {
    alert('adding a document');
  }

  addClass = () => {
    alert('adding a class');
  }

    render() {
      return(
        <div className = "button" onClick={this.handleClick}>
          <span>{this.props.label}</span>
        </div>
      );
    }
  }
