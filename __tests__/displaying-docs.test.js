import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DocumentArea from '../src/js/DocumentArea/DocumentArea';
import { DocThumbnail } from '../src/js/DocumentArea/DocumentArea';

describe('Displaying Docs', () => {
    it('Displays the documents', () => {
        let documents = [
            {id: 1, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}},
            {id: 2, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}},
            {id: 3, name: 'name', commentsCount: 2, user: {id: 1, name: 'f', username: 'f'}}
        ];
        let context = { router: { location: { pathname: '/login' } } };
        let docArea = shallow(<DocumentArea documents={documents} />, {context: context});
        expect(docArea.find(DocThumbnail).length).toBe(3);

    });
});