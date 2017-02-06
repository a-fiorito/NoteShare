import React, {Component} from 'react';

/*
Component for the area which will display the available notes on the user dashboard.
*/

//The constant is an array of objects meant to simulate getting the data from the database
const notes = [

  {id: 2, course : "SOEN 341", name : "AGILE NOTES", comments : 22},
  {id : 3, course : "SOEN 341", name : "SCRUM NOTES", comments : 14},
  {id : 4, course : "SOEN 371", name : "POISSON DISTRIBUTION", comments : 12},

];

class DocThumbnail extends Component {

    render(){
      return (
        <div>
          <h3>{notes.name}</h3>
          <h4>{notes.comments}</h4>
        </div>

      );

    }

}

export default class DocumentArea extends Component {

    render() {
        return (
            <div className="docs">
              <DocThumbnail />
              <img src="http://placehold.it/150x150"/>
            </div>
        );
    }
}
