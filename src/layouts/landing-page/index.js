import React from "react";
import LandingPageLayout from "examples/LayoutContainers/LandingPageLayout";

const LandingPage = () => {
  return (
    <LandingPageLayout>
    <div className="landing-page landing-page1">
      {/* Navigation */}
      <nav className="navbar navbar-transparent navbar-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button
              id="menu-toggle"
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#example"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar bar1"></span>
              <span className="icon-bar bar2"></span>
              <span className="icon-bar bar3"></span>
            </button>
            <a href="https://ittent.net/">
              <div className="logo-container">
                <div className="logo">
                  <img
                    src="assets/img/logos/ittent_logo.jpg"
                    alt="Ittent Logo"
                  />
                </div>
                <div className="brand">Ittent</div>
              </div>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="example">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://ittent.net/auth/login">
                  <i className="pe-7s-user"></i> Login
                </a>
              </li>
              <li>
                <a href="https://ittent.net/auth/register">
                  <i className="pe-7s-add-user"></i> Register
                </a>
              </li>
              <li>
                  <a href="https://ittent.net/about-us">
                  <i className="pe-7s-note2"></i> About us
                  </a>
              </li>
              <li>
                <a href="https://t.me/ittent_bot">
                  <i className="pe-7s-chat"></i> Telegram
                </a>
              </li>        
              <li>
                <div id="google_translate_element"></div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Wrapper */}
      <div className="wrapper">
        {/* Parallax Section */}
        <div className="parallax filter-gradient blue" data-color="blue">
          <div className="parallax-background">
            <img
              className="parallax-background-image"
              src="assets/img/template/bg3.jpg"
              alt="Background"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-5 hidden-xs">
                <div className="parallax-image">
                <img
                    className="phone"
                    src="assets/img/CelScreen.png"
                    style={{ marginTop: "20px" }}
                    alt="Phone"
                  />
                </div>
              </div>
              <div className="col-md-6 col-md-offset-1">
                <div className="description">
                  <h2>Be in control of prices</h2>
                  <br />
                  <h5>
                    Don't waste any more time looking at your flight ticket
                    prices all the time, just choose your ticket information and
                    the price you want to receive notifications!
                  </h5>
                </div>
                <div className="buttons">
                  <a href="https://ittent.net/dashboard">
                    <button className="btn btn-fill btn-neutral">
                      <i className="pe-7s-graph1"></i> Enter Dashboard
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="section section-gray section-clients">
          <div className="container text-center">
            <h4><b>Save money and don't waste time</b></h4>
            <p>
              Imagine planning your dream vacation or business trip
              without worrying about skyrocketing ticket prices. Our flight
              price monitoring service takes the stress out of booking airfare
              by tracking ticket prices for your desired destinations and
              notifying you the moment the best deals appear.
            </p>
          </div>
        </div>

        <div className="section section-features">
          <div className="container">
            <h4 className="header-text text-center">Benefits</h4>
            <div className="row">
              <div className="col-md-4">
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-alarm"></i>
                  </div>
                  <h4>Save Time</h4>
                  <p>
                    Skip the hassle of manually checking prices, our service
                    does the work for you!
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-cash"></i>
                  </div>
                  <div className="text">
                    <h4>Save Money</h4>
                    <p>
                      Get alerted when prices drop, know when to buy with
                      historical data of prices ensuring you never overpay for a
                      flight.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-bell"></i>
                  </div>
                  <h4>Customized Alerts</h4>
                  <p>
                    Set your preferred travel destinations, range prices, range
                    dates, and much more to receive notifications tailored to
                    your plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="section section-no-padding">
          <div className="parallax filter-gradient blue" data-color="blue">
            <div className="parallax-background">
              <img
                className="parallax-background-image"
                src="assets/img/template/bg3.jpg"
                alt="Background"
              />
            </div>
            <div className="info">
              <h1>Register now and receive 200 of price alert balance!</h1>
              <a
                href="https://ittent.net/auth/register"
                className="btn btn-neutral btn-lg btn-fill"
              >
                Register
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <nav className="pull-left">
              <ul>
                <li>
                  <a href="https://ittent.net/">Home</a>
                </li>
                <li>
                  <a href="https://ittent.net/about">About us</a>
                </li>
                <li>
                  <a href="mailto:ittent.flightalert@gmail.com">
                    <i className="pe-7s-mail"></i> Send Email
                  </a>
                </li>
              </ul>
            </nav>
            <div className="copyright">
              &copy; 2025 <a href="https://ittent.net/">Ittent</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </LandingPageLayout>
  );
};

export default LandingPage;
