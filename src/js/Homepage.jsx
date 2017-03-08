import React, { Component } from 'react';

var Scroll = require('react-scroll');
var Element = Scroll.Element;
var scroller = Scroll.scroller;

scroller.scrollTo('ScrollToElement', {
  duration: 1500,
  delay: 100,
  smooth: true,
})

/*
    Splash page to introduce website
*/
export default class Homepage extends Component {

    render() {
        return (
            <div className="home-page">
                <Header />
                <Features />
                <Footer />
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <div className="home-page">
                <header className="homepage-top">
                    <div className="top-content">
                        <h1>Note Share</h1>
                        <p>Share notes with classmates, get your assignments graded</p>
                        <div className="action-buttons">
                            <div className="btn">Get Started</div>
                            <div className="btn"><a onClick={this.scrollTo}>Learn More</a></div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

class Features extends Component {
    render() {
        return (
            <div className="features-container">
                <Feature
                    imgSrc="./assets/HomePageIcons/1.png"
                    header="DOWNLOAD NOTES"
                    body="Download notes from courses that you follow."
                />
                <Feature
                    imgSrc="./assets/HomePageIcons/2.png"
                    header="UPLOAD NOTES"
                    body="Upload notes to courses that you follow so everyone can see them."
                />
                <Feature
                    imgSrc="./assets/HomePageIcons/3.png"
                    header="POST DISCUSSION"
                    body="Post comments on notes and get your reviewed."
                />
                <Feature
                    imgSrc="./assets/HomePageIcons/4.png"
                    header="GET NOTIFIED"
                    body="Get notified when a course that you follow gets a new note or comment."
                />
                <Feature
                    imgSrc="./assets/HomePageIcons/5.png"
                    header="LANGUAGE MODERATED"
                    body="Posts are automatically moderated to make sure no foul language is used."
                />
                <Feature
                    imgSrc="./assets/HomePageIcons/6.png"
                    header="FOREVER FREE"
                    body="Made by students and will always remain free."
                />
            </div>
        )
    }
}


const Feature = ({imgSrc, header, body}) => {
    return (
        <div className="feature">
            <Element name="ScrollToElement"></Element>
            <img src={imgSrc} width="50" height="50"></img>
            <h3>{header}</h3>
            <p>{body}</p>
        </div>
    );
}

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="brand">NOTESHARE</div>
                <div className="copyright"> Made with love in concordias labs </div>
            </div>
        );
    }
}
