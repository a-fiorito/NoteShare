import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-07: User Profile (#8)
 * https://github.com/a-fiorito/NoteShare/issues/8
 */
describe('US-07: User Profile', () => {
    it('Renders the profile properly', () => {
        let user = {
            type: 'Student',
            username: 'mock'
        };
        let profile = shallow(<Profile user={user} params={{username: ''}} />);
        profile.setState({user: user});

        // check to see if profile is rendered
        expect(profile.find('.profile-area').length).toBeGreaterThan(0);
        expect(profile.find('.profile').length).toBeGreaterThan(0);
        expect(profile.find('.profile-body').length).toBeGreaterThan(0);
        expect(profile.find('.statistics').length).toBeGreaterThan(0);
        expect(profile.find('.my-courses').length).toBeGreaterThan(0);
        expect(profile.find('.document-container').length).toBeGreaterThan(0);

    });
});