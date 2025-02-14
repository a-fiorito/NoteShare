import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-22: Rename Uploaded Documents (#61)
 * https://github.com/a-fiorito/NoteShare/issues/61
 */
describe('US-22: Rename Uploaded Documents', () => {
    require('./helpers/local-storage-mock');
    it('Renames a document', () => {
        let documents = [
            {id: 1, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}},
            {id: 2, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}},
            {id: 3, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}}
        ];
        let user = {
            type: 'Student',
            username: 'mock'
        };
        let profile = shallow(<Profile user={user} params={{username: ''}} />);
        profile.setState({documents: documents});
        profile.instance().updateDocumentName({name: 'New Document Name', pos: 0, sendToDB: false});
        expect(profile.instance().state.documents[0].name).toEqual('New Document Name');

    });
});