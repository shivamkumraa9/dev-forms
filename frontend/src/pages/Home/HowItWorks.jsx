import { useState } from 'react';

export default function HowItWorks() {
  const [formData, setFormData] = useState({ name: 'John Doe', email: 'john@example.com', comment: 'This is comment' });
  const [text, setText] = useState('\n\n\n\n/*\nClick the submit button to see it in action\n*/\n\n\n\n ');

  function handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setText(`{
  "data": {
      "name": "${formData.name}",
      "email": "${formData.email}",
      "comment": "${formData.comment}"
  },
  "id": 690,
  "formId": "7abd580d-102f-444d-9771-d2eeca92e7dd",
  "updatedAt": "2023-04-04T02:32:51.635Z",
  "createdAt": "2023-04-04T02:32:51.635Z"
}`);
  }

  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>How it Works?</h2>
        </div>
        <div className="row content justify-content-around">
          <div className="col-lg-5 contact">
            <h3 className="text-center">Your Form</h3>
            <p className="text-center" style={{ fontSize: '13px' }}>Click Submit to try!</p>
            <form className="simple-form" onSubmit={handleSubmit}>
              <div className="row gy-2 gx-md-3">
                <div>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                  <input required type="text" className="form-control" value={formData.name} onChange={handleChange} name="name" id="exampleFormControlInput1" />
                </div>
                <div>
                  <label htmlFor="exampleFormControlInput2" className="form-label">Email</label>
                  <input required type="email" className="form-control" value={formData.email} onChange={handleChange} name="email" id="exampleFormControlInput2" />
                </div>
                <div className="">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                  <textarea required className="form-control" value={formData.comment} onChange={handleChange} name="comment" id="exampleFormControlTextarea1" rows="4" />
                </div>
                <div className="text-center col-12"><button type="submit" className="custom-button primary-button">Submit</button></div>
              </div>
            </form>
          </div>
          <div className="col-lg-5 pt-3 pt-lg-0">
            <h3 className="text-center">Your Submissions</h3>
            <p className="text-center" style={{ fontSize: '13px' }}>Your data stored in dev forms</p>
            <pre className="language-markup mt-lg-5">
              <code>{ text }</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
