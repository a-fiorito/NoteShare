import React from 'react';
import { shallow } from 'enzyme';
import NoteShare from '../src/js/NoteShare';

describe('App', () => {
    it('renders the Hello World', () => {
        const app = shallow(<NoteShare />);
        expect(app.find('div').text()).toEqual('Hello World');
    });
});