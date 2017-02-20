import React, {Component} from 'react';

/*
    Splash page to introduce website
*/
export default class Homepage extends Component {

    render() {
        return (
          <div>
            <div className="home-page">
                <Header />
                <Features />
            </div>
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
                            <div className="btn">Learn More</div>
                        </div>
                    </div>
            </header>
            </div>
        );
    }
}

class Features extends Component {
  render (){
    return(
        <div className="big-container">
          <div id="container3">
          <div id="container2">
              <div id="container1">
                  <div id="col1"><center><p><img src="./assets/HomePageIcons/1.png" width="50" height="50"></img></p>
                  <h3>DOWNLOAD NOTES</h3>
                  <p>Download notes from courses that you follow</p>
                  </center></div>
                  <div id="col2"><center><p><img src="./assets/HomePageIcons/2.png" width="50" height="50"></img></p>
                  <h3>UPLOAD NOTES</h3>
                  <p>Upload notes to courses that you follow so everyone can see them</p>
                  </center></div>
                  <div id="col3"><center><p><img src="./assets/HomePageIcons/3.png" width="50" height="50"></img></p>
                  <h3>POST DISCUSSION</h3>
                  <p>Post comments on notes and get your reviewed</p>
                  </center></div>
                  </div>
              </div>
          </div>
          <div id="container3">
          <div id="container2">
              <div id="container1">
                  <div id="col1"><center><p><img src="./assets/HomePageIcons/4.png" width="50" height="50"></img></p>
                  <h3>GET NOTIFIED</h3>
                  <p>Get notified when a course that you follow gets a new note or comment</p>
                  </center></div>
                  <div id="col2"><center><p><img src="./assets/HomePageIcons/5.png" width="50" height="50"></img></p>
                  <h3>LANGUAGE MODERATED</h3>
                  <p>Posts are automatically moderated to make sure no foul language is used</p>
                  </center></div>
                  <div id="col3"><center><p><img src="./assets/HomePageIcons/6.png" width="50" height="50"></img></p>
                  <h3>FOREVER FREE</h3>
                  <p>Made by students and will always remain free</p>
                  </center></div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

class Footer extends Component {
    render() {
        return (
          <div className="home-page">
              <div className="footer">
                  <div className="brand">NOTESHARE</div>
                  <div className="copyright"> Made with love in concordias labs </div>
              </div>
          </div>

        );
    }
}
