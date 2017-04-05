import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from '../src/js/Global/Navbar';

/**
 * UNIT TEST FOR US-10: Navbar (#17)
 * https://github.com/a-fiorito/NoteShare/issues/17
 */
describe('US-10: Navbar', () => {
    it('Shows the correct nav bar links depending on login status', () => {
        let user = false;
        let context = { router: { location: { pathname: '/login' } } };
        let nb = shallow(<Nav user={user} />, { context: context });
        expect(nb.find('li').length).toEqual(2);

        user = true;
        nb = shallow(<Nav signOut={() => { }} user={user} />, { context: context });
        expect(nb.find('li').length).toEqual(4);

    });
});