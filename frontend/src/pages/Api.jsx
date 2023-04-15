export default function Api() {
  return (
    <section className="container">
      <h1 className="fw-bold text-center">
        API Reference
      </h1>

      <h3 className="fw-bold">INTRODUCTION</h3>
      <hr />
      <p>
        The DevForms API is only available to users with Business plan. To use the api
        you need your api keys which can be found on the payment & api page.
      </p>
      <h3 className="mt-5 fw-bold">api/public/v1/forms</h3>
      <hr />
      <h5 className="fw-bold">Method : GET</h5>
      <p>Get a list of all forms in your account.</p>
      <h6 className="fw-bold">Example Request:</h6>
      <pre className=" language-markup"><code>curl -H &quot;apikey: efhci...04fj4&quot; &quot;https://devforms.herokuapp.com/api/public/v1/forms&quot;</code></pre>
      <h6 className="fw-bold">Example Response:</h6>
      <pre className=" language-markup">
        <code>
          {`[
    {
        "_id": "643ac276e9320647d27950dd",
        "user": "6437a4497ba5c276c59d6182",
        "name": "Test Form 1",
        "description": "This is a test form",
        "successRedirectUrl": "",
        "allowNewSubmissions": true,
        "sendEmailNotifications": true,
        "createdAt": "2023-04-15T15:27:50.792Z",
        "__v": 0,
        "totalSubmissions": 0
    },
    {
        "_id": "643ac28be9320647d27950f1",
        "user": "6437a4497ba5c276c59d6182",
        "name": "Test Form 2",
        "description": "This is a test form 2",
        "successRedirectUrl": "https://google.com/",
        "allowNewSubmissions": true,
        "sendEmailNotifications": true,
        "createdAt": "2023-04-15T15:28:11.817Z",
        "__v": 0,
        "totalSubmissions": 2
    }
]`}
        </code>
      </pre>
      <h3 className="mt-5 fw-bold">api/public/v1/forms/&lt;form-id&gt;/submissions</h3>
      <hr />
      <h5 className="fw-bold">Method : GET</h5>
      <p>
        Get all the submissions of a form.
      </p>
      <h6 className="fw-bold">Example Request:</h6>
      <pre className=" language-markup"><code>curl -H &quot;apikey: efhci...04fj4&quot; &quot;https://devforms.herokuapp.com/api/public/v1/forms/77c42f0f-.../submissions</code></pre>
      <h6 className="fw-bold">Example Response:</h6>
      <pre className=" language-markup">
        <code>
          {`[
    {
        "_id": "643ac2b8e9320647d2795105",
        "form": "643ac28be9320647d27950f1",
        "data": {
            "name": "Test user",
            "email": "testuser@gmail.com"
        },
        "createdAt": "2023-04-15T15:28:56.842Z",
        "__v": 0
    },
    {
        "_id": "643ac2c5e9320647d279510c",
        "form": "643ac28be9320647d27950f1",
        "data": {
            "name": "Test user1",
            "email": "testuser1@gmail.com"
        },
        "createdAt": "2023-04-15T15:29:09.822Z",
        "__v": 0
    }
]`}
        </code>
      </pre>
    </section>
  );
}
