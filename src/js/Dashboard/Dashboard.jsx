import React, { Component } from 'react';
import Button from '../Abstract/Button';
import DocumentArea from '../DocumentArea/DocumentArea';
import Sidebar from './Sidebar';
import UploadModal from './UploadModal';
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
            selectedCourse: JSON.parse(localStorage.getItem('selectedCourse')),
            isLoading: true,
            showModal: false,
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
        if (this.state.selectedCourse) {
            promises.push(this.fetchDocumentsForCourse(this.state.selectedCourse.id));
        }
        // load courses for sidebar and documents for document area
        Promise.all(promises)
            .spread((courses, documents) => {
                this.setState({
                    courses: courses.data,
                    documents: documents == null ? [] : documents.data, isLoading: false
                });
            });

    }

    fetchDocumentsForCourse(c) {
        return axios('/pdfs/' + c)
    }

    updateDocuments = (doc) => {
        let newDoc = { ...doc };
        newDoc.user = { ...this.props.user };
        newDoc.commentsCount = 0;
        this.setState({ documents: [newDoc].concat(this.state.documents) });
    }

    componentWillUnmount() {
        // allow other pages to scroll
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "";
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }


    setSelectedCourse = (c) => {
        if (c == null) {
            this.setState({ documents: [] });
            localStorage.removeItem('selectedCourse');
        } else {
            this.fetchDocumentsForCourse(c.id)
                .then(res => {
                    this.setState({ documents: res.data });
                });;
        }
        this.setState({ selectedCourse: c });
        localStorage.setItem('selectedCourse', JSON.stringify(c));
    }

    render() {
        return (
            <div className="dashboard">
                <UploadModal
                    user={this.props.user}
                    selectedCourse={this.state.selectedCourse}
                    showModal={this.state.showModal}
                    closeModal={this.toggleModal}
                    updateDocuments={this.updateDocuments}
                />
                {this.state.selectedCourse && <Button func={this.toggleModal} label={"Upload a document"} />}
                <div className="dashboard-content">
                    <Sidebar isLoading={this.state.isLoading} selectCourse={this.setSelectedCourse} selectedCourse={this.state.selectedCourse} courses={this.state.courses} user={this.props.user} />
                    <DocumentArea selectedCourse={this.state.selectedCourse} documents={this.state.documents} user={this.props.user} params={this.props.params} />
                </div>
            </div>
        );
    }
}
