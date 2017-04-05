import React from 'react';
import { mount } from 'enzyme';
import Profile from '../src/js/Profile/Profile';
import { Name } from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-16: Profile Biography (#46)
 * https://github.com/a-fiorito/NoteShare/issues/46
 */
describe('US-17: User Role', () => {
    require('./helpers/local-storage-mock');
    it('Makes sure user has a role on the profile', () => {
        let user = {
            type: 'Student',
            username: 'mock'
        };
        let profile = mount(<Profile user={user} params={{username: ''}} />);
        profile.setState({user: user});

        // test role student
        expect(profile.find(Name).find('.type').first().text()).toEqual('Student');

        // test role ta
        user.type = 'TA';
        profile.setState({user: user});
        expect(profile.find(Name).find('.type').first().text()).toEqual('TA');

        // test role teacher
        user.type = 'Teacher';
        profile.setState({user: user});
        expect(profile.find(Name).find('.type').first().text()).toEqual('Teacher');

        user.type = null;
        profile.setState({user: user});
        expect(profile.find(Name).find('.type').first().text()).toEqual('-');

    });
});