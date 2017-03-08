import React, {Component} from 'react';

import Button from './Button';
import DocumentArea from './DocumentArea';
import Sidebar from './Sidebar';
import Modal from './Modal';
import axios from 'axios';
import Promise from 'bluebird';

/*
    Main app view for viewing/uploading pdfs
*/
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedCourse: null,
            isLoading: true,
            documents: []
        };
    }

    componentDidMount() {
        // shouldnt be able to scroll on dashboard
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "hidden";

        let promises = [
            axios('/courses/' + this.props.user.username)
        ];
        // only get documents if a course is selected
        // TODO: save selected course in local storage
        if(this.state.selectedCourse) {
            promises.push(this.fetchDocumentsForCourse(this.state.selectedCourse.id));
        }
        // load courses for sidebar and documents for document area
        Promise.all(promises)
        .spread((courses, documents) => {
            this.setState({courses: courses.data, documents: documents == null ? [] : documents.data, isLoading: false});
        });
    }

    fetchDocumentsForCourse(c) {
        return axios('/pdfs/' + c)
            .then(res => {
                this.setState({documents: res.data});
            });
    }

    componentWillUnmount() {
        // allow other pages to scroll
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "";
    }


    setSelectedCourse = (c) => {
        if(c == null) {
            this.setState({documents: []});
        }
        this.setState({selectedCourse: c});
        this.fetchDocumentsForCourse(c.id);
    }

    render() {
        return (
          <div>
            <Modal user={this.props.user} selectedCourse={this.state.selectedCourse} canUpload={this.state.selectedCourse} />
            <div className="dashboard">
              <Sidebar isLoading={this.state.isLoading} selectCourse={this.setSelectedCourse} selectedCourse={this.state.selectedCourse} courses={this.state.courses} user={this.props.user} />
              <DocumentArea selectedCourse={this.state.selectedCourse} documents={this.state.documents} />
            </div>
          </div>
        );
    }
}
