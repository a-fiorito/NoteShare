import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../src/js/Global/LandingPage';
import auth from '../src/js/utils/auth';

describe('Landing Page', () => {
    it('Correctly highlights sign in and sign up depending on the path', () => {
        //expect(app.find('div').text()).toEqual('Hello World');
        let page = '/login';
        let lp = shallow(<LandingPage location={{pathname: page}}/>);
        
        expect(lp.find('.selected').text()).toEqual('SIGN IN');

        page = '/signup';
        lp = shallow(<LandingPage location={{pathname: page}}/>);

        expect(lp.find('.selected').text()).toEqual('SIGN UP');
    });

    it('Authenticates the user', () => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJvdm9hbnQiLCJuYW1lIjoiQW50aG9ueSBGaW9yaXRvIiwidHlwZSI6IlN0dWRlbnQiLCJpYXQiOjE0OTA0ODc1ODd9.A3vefn-eef1hfFhzwy0Q_0EHPdb5-x97lQOJA4MW0Oo';
        // valid token
        let user = auth.getCredentials(token);
        expect(user).toBeTruthy();

        // invalid token
        user = auth.getCredentials('mockToken');
        expect(user).toBeFalsy();
    });

});