import { Link } from 'react-router-dom';

function FooterLink(props) {
  const { to, name } = props;
  return (
    <li>
      <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px' }} />
      &nbsp;
      <Link to={to}>{name}</Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>DevForms</h3>
              <p>
                A108 Adam Street
                <br />
                New York, NY 535022
                <br />
                United States
                <b />
                <br />
                <strong>Phone:</strong>
                +1 5589 55488 55
                <br />
                <strong>Email:</strong>
                info@example.com
                <br />
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <FooterLink to="/" name="Home" />
                <FooterLink to="/" name="Features" />
                <FooterLink to="/" name="How it Works" />
                <FooterLink to="/contact-us" name="Contact Us" />
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <FooterLink to="/api" name="API" />
                <FooterLink to="/login" name="Login" />
                <FooterLink to="/register" name="Register" />
                <FooterLink to="/pricing" name="Pricing" />
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Join Our Newsletter</h4>
              <p>Get access to live updates, improvements and new features</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-md-flex py-4">
        <div className="text-center m-auto">
          <div className="copyright">
            &copy; Copyright
            <strong><span>DevForms</span></strong>
            . All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
