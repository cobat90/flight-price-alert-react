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
                    alt="Ittent Company Logo"
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
                  <i className="pe-7s-note2"></i> About us
                  </a>
              </li>
              <li>
                <a href="https://t.me/ittent_bot" translate="no">
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
              src="assets/img/template/bg3.webp"
              alt="Background Landing Page Image"
              loading="lazy"
            />
          </div>
          <div className="container">
            <div className="row">

              <div className="col-md-6 col-md-offset-1">
                <div className="description">
                  <h2>About Us</h2>
                  <br />
                  <h5>
                    Welcome to Ittent, your platform for monitoring prices of flights, hotels, car rentals, and more.
                    At Ittent, we empower you to be in control of your trip through alert prices while leaving the stress of constant monitoring to us.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section section-gray section-clients">
          <div className="container text-left">
            <h4><b>Our Mission</b></h4>
            <p>                   
              We understand how overwhelming it can be to hunt for the best deals, whether you're planning a dream vacation, a business trip, or a quick weekend getaway.
              Our mission is simple: <b>Save you time</b>, <b>help you save money</b> and <b>eliminate the hassle of tracking ever-changing prices</b>.
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
              <div className="col-md-4" >
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-home"></i>
                  </div>
                  <div className="text"  >
                    <h4>Hotels (coming)</h4>
                    <p>
                      Secure the best deals for your stays without the hassle of endless searches.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4" >
                <div className="card card-blue">
                  <div className="icon">
                    <i className="pe-7s-car"></i>
                  </div>
                  <h4>Car rentals (coming)</h4>
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
                src="assets/img/template/bg3.webp"
                alt="Background Landing Page Image"
                loading="lazy"
              />
            </div>
            <div className="info">
              <h1>How can we help?</h1>
              <a
                href="mailto:ittent.flightalert@gmail.com"
                className="btn btn-neutral btn-lg btn-fill"
              >
                Contact me
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
                  <a href="https://ittent.net/about-us">About us</a>
                </li>
                <li>
                  <a href="mailto:ittent.flightalert@gmail.com">
                    <i className="pe-7s-mail"></i>Send Email
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

export default AboutUsPage;
