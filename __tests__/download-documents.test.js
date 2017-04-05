import React from 'react';
import { shallow } from 'enzyme';
import { DocThumbnail } from '../src/js/DocumentArea/DocumentArea';

/**
 * UNIT TEST FOR US-03: Downloading Documents (#4)
 * https://github.com/a-fiorito/NoteShare/issues/4
 */
describe('US-03: Downloading Documents', () => {
    it('Creates proper download link for the user', () => {
        // mock document thumbnail
        let document = {
            commentsCount: 0,
            id: 1,
            name: 'Receipt',
            course: {
                name: 'COEN',
                number: '313'
            },
            user: {
                id: 1,
                name: 'Anthony Fiorito',
                username: 'anthony'
            }
        };
        let selectedCourse = {id: 1, name: 'COEN', number: '313'};
        let docThumbnail = shallow(
            <DocThumbnail 
                deleteDocument={jest.fn()} 
                pos={0} 
                editing={false} 
                showComments={jest.fn()} 
                selectedCourse={selectedCourse}  
                document={document} 
            />
        );
        // expected download link
        let downloadLink = `/pdfs/download/${document.user.username}/${selectedCourse.name + selectedCourse.number}/${document.id}`;
        expect(docThumbnail.find('a').first().prop('href')).toBe(downloadLink);

    });
});