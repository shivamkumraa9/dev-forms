import CopyToClipboard from '../components/CopyToClipboard';

export default function InstallTab({ formId }) {
  const url = `https://devforms.shivamkumraa.com/api/forms/submit/${formId}`;
  const formTag = `<form method="post" action="${url}"></form>`;

  return (
    <>
      <h4 className="fw-bold mt-4"> 1. Use the Submission Endpoint</h4>
      <p className="mt-3">You can use this submission endpoint either by incorporating it into a standard action attribute or by making an HTTP request with a POST method.</p>
      <div className="d-flex flex-row align-items-center gap-2">
        <CopyToClipboard text={url} fontSize="25px" />
        <pre className="language-markup flex-grow-1">
          <code>{url}</code>
        </pre>
      </div>

      <h4 className="fw-bold mt-4"> 2. Create Your Form</h4>
      <p className="mt-3">Include the submission URL in the action attribute of your form tag and ensure that the form method is set to POST.</p>
      <div className="d-flex flex-row align-items-center gap-2">
        <CopyToClipboard text={formTag} fontSize="25px" />
        <pre className="language-markup flex-grow-1">
          <code>{formTag}</code>
        </pre>
      </div>

      <h4 className="fw-bold mt-4"> 3. Configure Your Settings (Optional)</h4>
      <p className="mt-3">Go to the settings tab to make changes to the defaults.</p>
      <ul>
        <li>
          The Success Redirect setting changes where users will be redirected after sending
          a submission. By default, users will be redirected to our success page.
        </li>
        <li>
          New submissions can be turned on or off as needed.
        </li>
      </ul>
    </>
  );
}
