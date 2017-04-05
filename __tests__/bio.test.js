import React from 'react';
import { mount } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

describe('US-16: Profile Biography', () => {
    it('Renders the biography of a user', () => {
        let user = {
            type: 'Student',
            username: 'mock'
        };
        let profile = mount(<Profile user={user} params={{username: ''}} />);
        profile.setState({user: user, bio: ""});

        // shouldnt be a bio when bio is empty
        expect(profile.find('.bibliography').length).toBe(0);
        profile.setState({bio: "This is my bio"});
        // bio should appear when bio is not empty
        expect(profile.find('.bibliography').length).toBe(1);
        expect(profile.find('.bibliography > p').text()).toBe('This is my bio');
        
    });
});