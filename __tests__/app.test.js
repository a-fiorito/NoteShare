import React from 'react';
import { shallow, mount } from 'enzyme';
import Navbar from '../src/js/Navbar';

describe('Navbar', () => {
    it('Shows the correct nav bar links depending on login status', () => {
        let user = false;
        let context = {router: {location: {pathname: '/login'}}};
        let nb = shallow(<Navbar user={user}/>, {context: context});
        expect(nb.find("li").length).toEqual(2);
        
        user = true;
        nb = shallow(<Navbar signOut={() => {}} user={user}/>, {context: context});
        expect(nb.find("li").length).toEqual(4);

    });
});