import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-15: Profile Statistics (#44)
 * https://github.com/a-fiorito/NoteShare/issues/44
 */
describe('US-15: Profile Statistics', () => {
    require('./helpers/local-storage-mock');
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
        expect(profile.find('.statistics > p').at(0).text()).toEqual('Number of notes uploaded: 3 ');
        expect(profile.find('.statistics > p').at(1).text()).toEqual('Number of comments made: 7');

    });
});