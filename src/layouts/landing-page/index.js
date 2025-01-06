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
                    alt="Ittent Flight Price Monitoring Logo"
                  />
                </div>
                <div className="brand" translate="no">Ittent</div>
              </div>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="example">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="https://ittent.net/auth/login" translate="no">
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
                  <i className="pe-7s-users"></i> About us
                  </a>
              </li>
              <li>
                  <a href="https://ittent.net/faq">
                  <i className="pe-7s-note2"></i> FAQ
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
              src="assets/img/template/bg3.webp"
              alt="Background Landing Page Image"
              loading="lazy"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-5 hidden-xs">
                <div className="parallax-image">
                <img
                    className="phone"
                    src="assets/img/phone_screen.png"
                    style={{ marginTop: "20px" }}
                    alt="Mobile Screen Site View"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-md-6 col-md-offset-1">
                <div className="description">
                  <h1>Receive real-time flight ticket prices</h1>
                  <br />
                  <h5>
                    Don't waste any more time looking at your flight ticket
                    prices all the time, just choose your ticket information and
                    the price you want to receive notifications.
                    Create your alert of flight ticket here!
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
            <h2><b>Save money and don't waste time looking for best flight deals</b></h2>
            <p>
              Imagine planning your dream vacation or business trip
              without worrying about skyrocketing flight ticket prices. Our flight
              price alerts monitoring service takes the stress out and save you time
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
                    does the work for you and Receive Real-Time Flight Deals!
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
                src="assets/img/template/bg3.webp"
                alt="Background Landing Page Image"
                loading="lazy"
              />
            </div>
            <div className="info">
              <h1>Register now and receive a balance for free for create your alerts!</h1>
              <a
                href="https://ittent.net/auth/register"
                className="btn btn-neutral btn-lg btn-fill"
              >
                Register here
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
                    <a href="https://ittent.net/" translate="no">Home</a>
                  </li>
                  <li>
                    <a href="https://ittent.net/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="https://t.me/ittent_bot" translate="no">Telegram</a>
                  </li>
                  <li>
                    <a href="mailto:ittent.flightalert@gmail.com">
                    Send Email
                    </a>
                  </li>
                </ul>
              </nav>
            <div className="copyright">
            <a href="https://ittent.net/" translate="no">&copy; 2025 Ittent</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </LandingPageLayout>
  );
};

export default LandingPage;
