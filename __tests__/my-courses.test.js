import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../src/js/Dashboard/Sidebar';
import { Course } from '../src/js/Dashboard/Sidebar';

/**
 * UNIT TEST FOR US-12: My Courses (#19)
 * https://github.com/a-fiorito/NoteShare/issues/19
 */
describe('US-12: My Courses', () => {
    require('./helpers/local-storage-mock');

    let courses = [
        { id: 1, name: 'COEN', number: '346' },
        { id: 2, name: 'COEN', number: '313' },
        { id: 3, name: 'COEN', number: '352' }
    ];

    let sidebar;
    let selectCourseMock = jest.fn();
    beforeEach(() => {
        sidebar = mount(<Sidebar courses={courses} selectCourse={selectCourseMock} />);
    });

    it('Correctly displays the courses', () => {
        expect(sidebar.find(Course).length).toBe(3);
    });

    it('Correctly selects the course to view documents for', () => {

        //  expect course to get properly selected
        sidebar.setProps({ selectedCourse: courses[0] });
        expect(sidebar.find('.selected').length).toBe(1);

        // if course is already selected, should be deselected
        sidebar.setProps({ selectedCourse: null });
        expect(sidebar.find('.selected').length).toBe(0);
    });

    it('Passes the selectedCourse to parent', () => {
        sidebar.find(Course).first().simulate('click');
        expect(selectCourseMock).toBeCalledWith(courses[0]);

        sidebar.setProps({ selectedCourse: courses[0] });
        sidebar.find(Course).first().simulate('click');
        expect(selectCourseMock).toBeCalledWith(null);
    });

});