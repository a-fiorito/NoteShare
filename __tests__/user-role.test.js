import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Profile from '../src/js/Profile/Profile';
import { Name } from '../src/js/Profile/Profile';

describe('Profile', () => {
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

    })
})