import React from 'react';
import { shallow } from 'enzyme';
import CommentsModal from '../src/js/DocumentArea/CommentsModal';
import { Comment } from '../src/js/DocumentArea/CommentsModal';

describe('Add Comment', () => {
    it('Correctly adds a new comment', () => {
        let comments = [{ 
            createdAt: "Wed Mar 22 2017",
            body: "commenting on my own note",
            user: {
                id: 1,
                name: "Marial Grace",
                username: "mg"
            }
        }, 
        {
            createdAt: "Tue Mar 21 2017",
            body: "i love to comment",
            user: {
                id: 2,
                name: "Stewart Earl",
                username: "se"
            }}];
        const cm = shallow(<CommentsModal params={{id: 1}} user={{id: 3, username: 'ps', name: 'Paul Seo'}}/>);
        cm.instance().scrollToBottom = jest.fn();
        cm.setState({comments: comments});
        cm.instance().updateComments({
            createdAt: "Mon Mar 20 2017",
            body: "i hate to comment",
            user: {
                id: 3,
                name: "Paul Seo",
                username: "ps"
            }});
        expect(cm.instance().state.comments.length).toBe(3);
        expect(cm.instance().state.comments).toEqual(expect.arrayContaining([
            { 
            createdAt: "Wed Mar 22 2017",
            body: "commenting on my own note",
            user: {
                id: 1,
                name: "Marial Grace",
                username: "mg"
                }
        }, 
        {
            createdAt: "Tue Mar 21 2017",
            body: "i love to comment",
            user: {
                id: 2,
                name: "Stewart Earl",
                username: "se"
            }},
            {
            createdAt: "Mon Mar 20 2017",
            body: "i hate to comment",
            user: {
                id: 3,
                name: "Paul Seo",
                username: "ps"
            }}
        ]));

    });
});