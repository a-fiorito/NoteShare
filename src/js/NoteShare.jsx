import React, {Component} from 'react';

/**
 * Main container component
 * Place all child components within the div tags
 */
class NoteShare extends Component {
    render() {
        return (
            <div className="app-container">
            Hello World
            </div>
        );
    }
}


// there can only be one "export default" per file
// if you want to export more than one component in a single file you can just use 
// export ComponentName;
// When you use "export default", you import by writing import ComponentName from 'filelocation';
// When you just use "export" it needs to be before the type declaration (eg. export class NoteShare ...)
// you import by writing import {ComponentName} from 'filelocation';
// the file location doesn't need a file extension for both methods of export
export default NoteShare;