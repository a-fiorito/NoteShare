import React, {Component} from 'react';

import Button from './Button';
import DocumentArea from './DocumentArea';
import Sidebar from './Sidebar';
import Modal from './Modal';

/*
    Main app view for viewing/uploading pdfs
*/
export default class Dashboard extends Component {

    componentDidMount() {
        // shouldnt be able to scroll on dashboard
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "hidden";
    }

    componentWillUnmount() {
        // allow other pages to scroll
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "";
    }

    render() {
        return (
          <div>
            <Modal />
            <div className="dashboard">
              <Sidebar />
              <DocumentArea />
            </div>
          </div>
        );
    }
}
