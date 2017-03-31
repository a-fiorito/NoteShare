import React from 'react';
import { shallow } from 'enzyme';
import { DocThumbnail } from '../src/js/DocumentArea/DocumentArea';

describe('Document Area', () => {
    it('Creates proper download link for the user', () => {
        // mock document thumbnail
        let document = {
            commentsCount: 0,
            id: 1,
            name: 'Receipt',
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
        let downloadLink = `/pdfs/download/${document.user.username}/${selectedCourse.name + selectedCourse.number}/${document.id}`;
        expect(docThumbnail.find('a').first().prop('href')).toBe(downloadLink);

    });
});