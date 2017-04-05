import React from 'react';
import { mount } from 'enzyme';
import Profile from '../src/js/Profile/Profile';
import { Name } from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-18: Profile Editing (#47)
 * https://github.com/a-fiorito/NoteShare/issues/47
 */
describe('US-18: Profile Editing', () => {
    require('./helpers/local-storage-mock');
    it('updates the profile', () => {
        let profile = mount(<Profile params={{username: 'mock'}} user={{id: 1, username: 'ovoant', name: 'anthony', type: 'Student'}} />);

        profile.setState({
            showDocuments: false,
            showAdd: false,
            documents: [],
            statistics: {
                numberOfComments: 2,
                numberOfDocuments: 4,
            },
            courses: [],
            bio: 'This is my bio',
            user: {id: 1, username: 'ovoant', name: 'anthony', type: 'Student'},
            editing: false,
            changesMade: false,
            error: false
        });

        profile.instance().updateName('new name');
        expect(profile.find(Name).find('.name').first().text()).toEqual('new name');

    });
});