import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import Profile from '../src/js/Profile/Profile';

/**
 * UNIT TEST FOR US-08: Adding Courses (#9)
 * https://github.com/a-fiorito/NoteShare/issues/9
 */
describe('US-08: Adding Courses', () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('Adds a course to the profile', (done) => {
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
        let addedCourse = {
            id: 1, name: 'ELEC', number: '273'
        };

        let profile = shallow(<Profile user={user} params={{ username: '' }} />);
        profile.setState({ courses: courses });
        profile.instance().addCourse(courses[0], false);

        // mock http request
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: addedCourse
            })
                .then(() => {
                    expect(profile.instance().state.courses.length).toBe(3);
                    done();
                });
        });
    });
});