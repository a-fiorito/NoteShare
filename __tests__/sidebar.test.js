import React from 'react';
import { shallow, mount } from 'enzyme';
import Sidebar from '../src/js/Dashboard/Sidebar';
import { Course } from '../src/js/Dashboard/Sidebar';

let courses = [
    { id: 1, name: 'COEN', number: '346' }, 
    { id: 2, name: 'COEN', number: '313' }, 
    { id: 3, name: 'COEN', number: '352' }
];

describe('Sidebar', () => {
    var localStorageMock = (function() {
        var store = {};
        return {
            getItem: function(key) {
                return store[key];
            },
            setItem: function(key, value) {
                store[key] = value.toString();
            },
            clear: function() {
                store = {};
            }
        };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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
        sidebar.setProps({selectedCourse: courses[0]});
        expect(sidebar.find('.selected').length).toBe(1);

        // if course is already selected, should be deselected
        sidebar.setProps({selectedCourse: null});
        expect(sidebar.find('.selected').length).toBe(0);

    });

    it('Passes the selectedCourse to parent', () => {
        sidebar.find(Course).first().simulate('click');
        expect(selectCourseMock).toBeCalledWith(courses[0]);

        sidebar.setProps({selectedCourse: courses[0]});
        sidebar.find(Course).first().simulate('click');
        expect(selectCourseMock).toBeCalledWith(null);
    });
    

});