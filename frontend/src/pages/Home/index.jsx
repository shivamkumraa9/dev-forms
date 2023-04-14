import mainLogo from '../../assets/img/hero-bg.jpg';
import Pricing from '../Pricing';
import Contact from '../Contact';
import HowItWorks from './HowItWorks';

export default function Home() {
  return (
    <>
      <section id="hero" className="d-flex align-items-center" style={{ backgroundImage: `url(${mainLogo})` }}>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9 text-center">
              <h1>Complete Form Backend As a Service</h1>
              <h2>Collect submissions and trigger webhooks, emails, and other actions.</h2>
            </div>
          </div>
          <div className="text-center">
            <a href="#about" className="btn-get-started scrollto">Get Started</a>
          </div>

          <div className="row icon-boxes">
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="fa-solid fa-infinity" /></div>
                <h4 className="title"><a href="/#">Unlimited Forms</a></h4>
                <p className="description">Create an unlimited number of forms to collect data from your users.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="fa-solid fa-screwdriver-wrench" /></div>
                <h4 className="title"><a href="/#">Email & Webhook</a></h4>
                <p className="description">Get notified instantly via email notification or trigger a webhook for each submission.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="fa-solid fa-laptop-code" /></div>
                <h4 className="title"><a href="/#">API Access</a></h4>
                <p className="description">Integrate with ease using our API to access and manage your form data.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="fa-sharp fa-regular fa-square-check" /></div>
                <h4 className="title"><a href="/#">Easy to Use</a></h4>
                <p className="description">Set up and start creating forms in minutes with no external library required.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <main id="main">
        <HowItWorks />
        <Pricing />
        <Contact />
      </main>
    </>
  );
}
