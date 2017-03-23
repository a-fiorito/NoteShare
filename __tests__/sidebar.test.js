import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../src/js/Dashboard/Sidebar';
import { Course } from '../src/js/Dashboard/Sidebar';

describe('Sidebar', () => {
    it('Correctly displays the courses', () => {
        let courses = [{ id: 1, name: "COEN", number: "346" }, { id: 2, name: "COEN", number: "313" }, { id: 3, name: "COEN", number: "352" }];
        const sidebar = shallow(<Sidebar courses={courses} />);
        expect(sidebar.find(Course).length).toBe(3);

    });
});