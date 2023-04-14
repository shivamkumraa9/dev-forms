import { useState } from 'react';

export default function Contact() {
  const [msg, setMsg] = useState('Send Message');

  const handleClick = (e) => {
    e.preventDefault();
    setMsg('Message Sent!');
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
          <p>
            If you have any queries or concerns,
            please don not hesitate to reach out to us for assistance.
          </p>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="fa-sharp fa-solid fa-location-dot" />
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
              <div className="email">
                <i className="fa-solid fa-envelope" />
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>
              <div className="phone">
                <i className="fa-solid fa-phone-flip" />
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mt-5 mt-lg-0">
            <form className="simple-form" onSubmit={handleClick}>
              <div className="row gy-2 gx-md-3">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                </div>
                <div className="form-group col-12">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group col-12">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" required />
                </div>
                <div className="text-center col-12"><button className="custom-button primary-button" type="submit">{ msg }</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
