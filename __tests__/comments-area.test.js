import React from 'react';
import { shallow } from 'enzyme';
import CommentsModal from '../src/js/DocumentArea/CommentsModal';
import { Comment } from '../src/js/DocumentArea/CommentsModal';

/**
 * UNIT TEST FOR US-14: Comment Area (#33)
 * https://github.com/a-fiorito/NoteShare/issues/33
 */
describe('US-14: Comment Area', () => {
    it('Correctly displays the comments', () => {
        let comments = [{
            createdAt: 'Wed Mar 22 2017',
            body: 'commenting on my own note',
            user: {
                id: 1,
                name: 'Marial Grace',
                username: 'mg'
            }
        }];
        const cm = shallow(<CommentsModal params={{id: 1}}/>);
        cm.setState({comments: comments});

        expect(cm.find(Comment).length).toBe(1);

    });
});