import { useRef } from 'react';
import http from '../../../utils/http';

export default function SubmissionModel({ submissionData, formSubmissions, setFormSubmissions }) {
  const closeBtn = useRef(null);
  const data = JSON.stringify(submissionData.data);

  function handleDelete(event) {
    const { target } = event;
    target.disabled = true;
    target.textContent = 'Deleting';
    http.delete(`forms/submissions/${submissionData._id}`)
      .then(() => {
        closeBtn.current.click();
        setFormSubmissions(formSubmissions.filter((item) => item._id !== submissionData._id));
      });
  }

  function handleCopy(event) {
    const { target } = event;
    target.textContent = 'Copied';
    navigator.clipboard.writeText(data);
  }

  return (
    <div className="modal fade" id={submissionData._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Submission</h1>
            <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Value</label>
              <textarea className="form-control" rows="3" defaultValue={data} />
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
