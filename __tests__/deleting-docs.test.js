import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-19: Deleting Documents (#48)
 * https://github.com/a-fiorito/NoteShare/issues/48
 */
describe('US-19: Deleting Documents', () => {
    require('./helpers/local-storage-mock');
    it('Deletes the document', () => {
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
        profile.instance().deleteDocument(0);
        expect(profile.instance().state.documents.length).toBe(2);
        expect(profile.instance().state.documents).toEqual(expect.arrayContaining([
            {id: 2, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}},
            {id: 3, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}}
        ]));

    });
});