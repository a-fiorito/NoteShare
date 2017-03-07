import React, {Component} from 'react';

export default class Button extends Component {

  constructor(props){
    super(props);
  }

    render() {
      return(
        <div className = "button" onClick={this.props.func}>
          <span>{this.props.label}</span>
        </div>
      );
    }
  }
