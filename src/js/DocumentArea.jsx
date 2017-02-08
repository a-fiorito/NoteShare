import React, {Component} from 'react';

/*
Component for the area which will display the available notes on the user dashboard.
*/

//The constant is an array of objects meant to simulate getting the data from the database
let notes = [

  {id : 2, course : "SOEN 341", name : "AGILE NOTES", comments : 22},
  {id : 3, course : "SOEN 341", name : "SCRUM NOTES", comments : 14},
  {id : 4, course : "SOEN 331", name : "ALGEBRAIC SPECIFICATION", comments : 15},
  {id : 5, course : "SOEN 331", name : "PREDICATE LOGIC", comments : 3},
  {id : 6, course : "SOEN 371", name : "POISSON DISTRIBUTION", comments : 12},
  {id : 7, course : "SOEN 371", name : "BINOMIAL DISTRIBUTION", comments : 7},
  {id : 8, course : "SOEN 341", name : "AGILE NOTES", comments : 22},
  {id : 9, course : "SOEN 341", name : "SCRUM NOTES", comments : 14},
  {id : 10, course : "SOEN 331", name : "ALGEBRAIC SPECIFICATION", comments : 15},
  {id : 11, course : "SOEN 331", name : "PREDICATE LOGIC", comments : 3},
  {id : 12, course : "SOEN 371", name : "POISSON DISTRIBUTION", comments : 12},
  {id : 13, course : "SOEN 371", name : "BINOMIAL DISTRIBUTION", comments : 7}

];


class DocThumbnail extends Component {
    //use a placeholder image for now

    constructor(props){
      super();
    }

    render(){
        return (
          <div className = "doc-thumbnail">
            <img src="./assets/images/placeholder-300x300.png"></img>
            <p>{this.props.name}</p>
            <p>{this.props.course}</p>
            <p>Comments: {this.props.comments}</p>
          </div>
        );
    }
}

export default class DocumentArea extends Component {

    constructor(props){
      super();
      this.state = {order: "Newest", numPerRow: 6};
    }

    _onRowChange = (select) => {
      //update the state to reflect the change in the dropdown
      //because setState is async, call the setState only after it has been processed
      this.setState({numPerRow: select.target.value}, this._setNumPerRow);
    }

    _setNumPerRow = () => {

      switch(this.state.numPerRow){

        case '3':
          this.__setWidth('28%', 'doc-thumbnail');
        break;

        case '6':
          this.__setWidth('12%', 'doc-thumbnail');
        break;

        case '10':
          this.__setWidth('6%', 'doc-thumbnail');
        break;

      }
    }

    __setWidth = (width, className) => {
      //returns an array- like object so we have to change it to an array
      var obj = document.getElementsByClassName(className);
      Array.from(obj).forEach(obj=>{
        obj.style.width=width;
      });

    }

    render() {
        return (
            <div className="docs">
              <div id="doc-wrapper" className="doc-wrapper">
                {notes.map(info =>
                  <DocThumbnail key = {info.id} {...info}/>//dump all the props
                )}
              </div>
              <select onChange={this._onRowChange}>
                <option value='6'>6</option>
                <option value='3'>3</option>
                <option value='10'>10</option>
              </select>
            </div>
        );
    }
}
