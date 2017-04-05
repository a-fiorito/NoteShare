import React from 'react';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import Profile from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-21: Delete a Joined Course (#60)
 * https://github.com/a-fiorito/NoteShare/issues/60
 */
describe('US-21: Delete a Joined Course', () => {
    require('./helpers/local-storage-mock');

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('Deletes the course from the profile', (done) => {
        // mock data
        let courses = [
            { id: 1, name: 'COEN', number: '313' },
            { id: 2, name: 'SOEN', number: '341' }
        ];
        let user = {
            id: 1,
            type: 'Student',
            username: 'mock'
        };

        let profile = shallow(<Profile user={user} params={{ username: '' }} />);
        profile.setState({ courses: courses });
        profile.instance().deleteCourse(0, courses[0]);

        // mock http request
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    success: true
                }
            })
            .then(() => {
                expect(profile.instance().state.courses.length).toBe(1);
                done();
            });
        });
    });
});