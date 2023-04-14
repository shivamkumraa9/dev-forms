import { useRef } from 'react';

export default function SubmissionModel({ submissionData, formSubmissions, setFormSubmissions }) {
  const closeBtn = useRef(null);

  function handleDelete(event) {
    const { target } = event;
    target.disabled = true;
    target.textContent = 'Deleting';
    setTimeout(() => {
      closeBtn.current.click();
      setFormSubmissions(formSubmissions.filter((item) => item.id !== submissionData.id));
    }, 1500);
  }

  function handleCopy(event) {
    const { target } = event;
    target.textContent = 'Copied';
    navigator.clipboard.writeText(submissionData.data);
  }

  return (
    <div className="modal fade" id={submissionData.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Submission</h1>
            <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Value</label>
              <textarea className="form-control" rows="3" defaultValue={submissionData.data} />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={handleCopy} type="button" className="btn btn-primary mr-2">Copy</button>
            <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
