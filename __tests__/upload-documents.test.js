import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import UploadModal from '../src/js/Dashboard/UploadModal';
import Dashboard from '../src/js/Dashboard/Dashboard';
import Button from '../src/js/Abstract/Button';

/**
 * UNIT TEST FOR US-02: Uploading Documents (#3)
 * https://github.com/a-fiorito/NoteShare/issues/3
 */
describe('US-02: Uploading Documents', () => {
    require('./helpers/local-storage-mock');
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    const userProp = {
        id: 1,
        username: 'Username',
        name: 'Name',
        email: 'email@email.com',
        password: 'hashed',
    };
    let doc = {
        id: 1,
        name: 'New Document',
        createdAt: '2017-03-27 23:55:15.769-04',
        updatedAt: '2017-03-27 23:55:15.769-04',
        courseId: 1
    };

    it('will call the upload function when the button is clicked', () => {

        //mount the modal and give it a state and props so the button will not be disabled
        const uploadModal = mount(<UploadModal />);
        let state = {
            files: [new File(['data'], 'filename')],
            filename: 'filename',
            success: false,
            isDisabled: false,
        };

        let props = {
            selectedCourse: { id: 1, name: 'SOEN', number: '341' },
            user: { id: 1, username: 'user' },
        };

        uploadModal.setState(state);
        uploadModal.setProps(props);

        expect(uploadModal.contains(<Button />));

        const onUpload = jest.fn();
        const button = mount(<Button label={'label'} func={onUpload} />);
        button.simulate('click');
        expect(onUpload).toBeCalled();

    });

    it('will add a new document to the uploadModal state in preparation of uploading', () => {

        const uploadModal = shallow(<UploadModal />);
        let acceptedFiles = [];

        //create the files we are passing
        let acceptedFile = new File(['content'], 'filename');
        acceptedFiles.push(acceptedFile);
        let otherFile = null;

        expect(uploadModal.state().files.length).toEqual(0);

        //file is ready to be uploaded
        uploadModal.instance().onDrop(acceptedFiles, otherFile);
        expect(uploadModal.state().files.length).toEqual(1);
        expect(uploadModal.state().filename).toEqual('filename');
    });

    it('uploads the file', () => {

        jest.useFakeTimers();

        //mount the modal and give it a state and props so the button will not be disabled
        const uploadModal = mount(<UploadModal />);
        let state = {
            files: [new File(['data'], 'filename')],
            filename: 'filename',
            success: false,
            isDisabled: false,
            isUploading: false,
        };

        let props = {
            selectedCourse: { id: 1, name: 'SOEN', number: '341' },
            user: { id: 1, username: 'user' },
        };

        uploadModal.setState(state);
        uploadModal.setProps(props);

        uploadModal.instance().onUpload();
        jest.runTimersToTime(700);

        //if the file uploads properly, the success state will be true at 0.7 seconds
        expect(uploadModal.state().success).toEqual(true);
    });

    it('will add a new document to the dashboard once uploaded', () => {
        //document has already been uploaded
        const dashboard = shallow(<Dashboard />);
        expect(dashboard.state().documents.length).toEqual(0);

        dashboard.setProps({ user: userProp });

        dashboard.instance().updateDocuments(doc);
        expect(dashboard.state('documents').length).toEqual(1);
        expect(dashboard.state('documents')[0].name).toEqual('New Document');
        expect(dashboard.state('documents')[0].user.username).toEqual('Username');
    });

});
