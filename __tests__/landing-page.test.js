import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../src/js/Global/LandingPage';

describe('Landing Page', () => {
    it('Correctly highlights sign in and sign up depending on the path', () => {
        //expect(app.find('div').text()).toEqual('Hello World');
        let page = "/login"
        let lp = shallow(<LandingPage location={{pathname: page}}/>);
        
        expect(lp.find(".selected").text()).toEqual("SIGN IN");

        page="/signup"
        lp = shallow(<LandingPage location={{pathname: page}}/>);

        expect(lp.find(".selected").text()).toEqual("SIGN UP");
    });
});