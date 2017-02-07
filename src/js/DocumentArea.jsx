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
  {id : 7, course : "SOEN 371", name : "BINOMIAL DISTRIBUTION", comments : 7}

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
      this.state = {order: "Newest"};
    }

    _onOrderChange = (select) => {
      //update the state to reflect the change in the dropdown
      //because setState is async, call the changeOrder only after it has been processed
      this.setState({order: select.target.value}, this._changeOrder);
    }

    _changeOrder = () => {

      switch(this.state.order){

        case "class":

        //array to store a list of unique courses. might take this out later depending on how we
        //set up the system.
        var uniqueClasses = [];
        //find how many unique courses there are

        for(var x=0;x<notes.length;x++){
          if(uniqueClasses.includes(notes[x].course))
            uniqueClasses.push(notes[x].course);
        }




        break;

        default:




      }
    }

    render() {
        return (
            <div className="docs">
              <div className="docs-wrapper">
                <p>{this.state.order}</p>
                {notes.map(info =>
                  <DocThumbnail key = {info.id} {...info}/>//dump all the props
                )}
              </div>
              <select onChange={this._onOrderChange}>
                <option value="new">Newest</option>
                <option value="class">By Class</option>
                <option value="old">Oldest</option>
              </select>
            </div>
        );
    }
}
