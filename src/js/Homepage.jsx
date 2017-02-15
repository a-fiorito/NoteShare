import React, {Component} from 'react';

/*
    Splash page to introduce website
*/
export default class Homepage extends Component {

    render() {
        return (
            <div className="home-page">
                <Header />
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <header className="homepage-top">
                    <div className="top-content">
                        <h1>Note Share</h1>
                        <p>Share notes with classmates, get your assignments graded</p>
                        <div className="action-buttons">
                            <div className="btn">Get Started</div>
                            <div className="btn">Learn More</div>
                        </div>
                    </div> 
            </header>
        );
    }
}