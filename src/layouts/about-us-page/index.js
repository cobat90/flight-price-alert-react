import React from "react";
import LandingPageLayout from "examples/LayoutContainers/LandingPageLayout";

const AboutUsPage = () => {
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
                  <a href="http://localhost:3000/about-us">
                  <i className="pe-7s-plane"></i> About us
                  </a>
              </li>
              <li>
                <a href="https://t.me/ittent_bot">
                  <i className="pe-7s-chat"></i> Telegram
                </a>
              </li>
              <li>
                <a href="mailto:ittent.flightalert@gmail.com">
                  <i className="pe-7s-mail"></i> Send Email
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
                    src="assets/img/template/CelScreen.png"
                    style={{ marginTop: "20px" }}
                    alt="Phone"
                  />
                </div>
              </div>
              <div className="col-md-6 col-md-offset-1">
                <div className="description">
                  <h2>About Us</h2>
                  <br />
                  <h5>
                    Welcome to Ittent, your personal price-alert concierge for flights, hotels, car rentals, and more.
                    At Ittent, we empower you to be in control of prices while leaving the stress of constant monitoring to us.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section section-gray section-clients">
          <div className="container text-center">
            <h4>Our Mission</h4>
            <p>                   
              We understand how overwhelming it can be to hunt for the best deals, whether you're planning a dream vacation, a business trip, or a quick weekend getaway. Our mission is simple:
              <ol><li>Save you time.</li>
              <li>Help you save money.</li>
              <li>Eliminate the hassle of tracking ever-changing prices.</li>
              </ol>
            </p>
          </div>
        </div>

        <div className="section section-features">
          <div className="container">
            <h4 className="header-text text-center">What We Offer</h4>
            <div className="row">
              <div className="col-md-4">
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-plane"></i>
                  </div>
                  <h4>Flight tickets</h4>
                  <p>
                    Track fares for your desired destinations and get notified as soon as prices drop.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-home"></i>
                  </div>
                  <div className="text">
                    <h4>Hotels</h4>
                    <p>
                      Secure the best deals for your stays without the hassle of endless searches.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-car"></i>
                  </div>
                  <h4>Car rentals</h4>
                  <p>
                    Book at the perfect time with alerts on rental offers.
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
              <h1>Register now and receive 500 of price alert balance!</h1>
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

export default AboutUsPage;
