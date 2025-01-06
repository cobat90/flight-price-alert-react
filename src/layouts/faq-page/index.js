import React from "react";
import LandingPageLayout from "examples/LayoutContainers/LandingPageLayout";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
  const faqData = [
    {
      question: "What is Ittent?",
      answer: "Ittent is a platform for searching and monitoring for cheap flights, hotels and car rentals prices. Get real-time updates on flight deals and save money on your travels."
    },
    {
      question: "How does it manage to find low prices?",
      answer: "Ittent will keep in track whenever prices changes, then notifications will be sent for you as you defined in your alerts."
    },
    {
      question: "What are the alerts like?",
      answer: "After logged in, you can create alerts and custom it as you wish to receive new notifications. You can create as many alerts as you want and set the duration of each alert."
    },
    {
      question: "What are the notifications like?",
      answer: "Currently for each alert, you can choose to receive notifications by Email, Telegram or SMS with all informations of prices and the flight."
    },
    {
      question: "Is Ittent free to use?",
      answer: "The duration of each alert is counted for each time the price is verified and added in history. You can verify how much balance your alert or how much balance available for use on the right top corner of the page."
    }
  ];
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

              <div className="col-md-6 col-md-offset-1">
                <div className="description">
                  <h1>FAQ</h1>
                  <br />
                  <h4>
                    See the answers to the most frequently asked questions
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section section-gray section-clients">
          <div className="container text-left">
              <Box sx={{ my: 6 }}>
                {faqData.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <Typography variant="h3">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
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

export default FAQPage;
