import React from 'react';
import { mount } from 'enzyme';
import Profile from '../src/js/Profile/Profile';


/**
 * UNIT TEST FOR US-16: Profile Biography (#45)
 * https://github.com/a-fiorito/NoteShare/issues/45
 */
describe('US-16: Profile Biography', () => {
    require('./helpers/local-storage-mock');
    it('Renders the biography of a user', () => {
        let user = {
            type: 'Student',
            username: 'mock'
        };
        let profile = mount(<Profile user={user} params={{username: ''}} />);
        profile.setState({user: user, bio: ''});

        // shouldnt be a bio when bio is empty
        expect(profile.find('.bibliography').length).toBe(0);
        profile.setState({bio: 'This is my bio'});
        // bio should appear when bio is not empty
        expect(profile.find('.bibliography').length).toBe(1);
        expect(profile.find('.bibliography > p').text()).toBe('This is my bio');
        
    });
});