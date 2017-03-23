import React from 'react';
import { shallow } from 'enzyme';
import Button from '../src/js/Abstract/Button';

describe('Button', () => {
    it('Gets the diabled class when given disabled prop', () => {
        let disabled = true;
        let button = shallow(<Button isDisabled={disabled} />);
        expect(button.find("div").hasClass('disabled')).toEqual(true);

        disabled = false;

        button = shallow(<Button isDisabled={disabled} />);
        expect(button.find("div").hasClass('disabled')).toEqual(false);

    });
});