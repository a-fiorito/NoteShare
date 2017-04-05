import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

describe('Correct Statistics', () => {
    it('Shows correct Statistics', () => {
        let statistics = {
                numberOfComments: 7,
                numberOfDocuments: 3,
            };
        let user = {
            type: 'Student',
            username: 'mock'
        };
        let profile = shallow(<Profile user={user} params={{username: ''}} />);
        profile.setState({statistics: statistics});  
        expect(profile.find('.statistics > p').at(0).text()).toEqual("Number of notes uploaded: 3 ");
        expect(profile.find('.statistics > p').at(1).text()).toEqual("Number of comments made: 7");

    });
});