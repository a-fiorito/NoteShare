import React from 'react';
import { mount } from 'enzyme';
import Homepage from '../src/js/Global/Homepage';
import { Feature } from '../src/js/Global/Homepage';
import { Footer } from '../src/js/Global/Homepage';

describe('US-11: Homepage', () => {
    it('Renders the homepage properly', () => {
        let homepage = mount(<Homepage />);

        // check to see if homepage is rendered
        expect(homepage.find('.home-page').length).toBeGreaterThan(0);
        expect(homepage.find(Feature).length).toBe(6);
        expect(homepage.find(Footer).length).toBe(1);

    });
});