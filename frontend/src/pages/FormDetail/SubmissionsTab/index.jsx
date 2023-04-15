import { useState } from 'react';
import Refresh from './Refresh';
import SubmissionModel from './SubmissionModel';
import SubmissionTableRow from './SubmissionTableRow';
import Download from './Download';

export default function SubmissionTab({ submissions, formId }) {
  const [formSubmissions, setFormSubmissions] = useState(submissions);

  const tableRows = formSubmissions.map((item, index) => (
    <SubmissionTableRow submission={item} index={index} key={item._id} />
  ));

  const submissionModels = formSubmissions.map((item) => (
    <SubmissionModel
      key={item._id}
      submissionData={item}
      formSubmissions={formSubmissions}
      setFormSubmissions={setFormSubmissions}
    />
  ));

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mt-2 mb-2">
        <Refresh formId={formId} setFormSubmissions={setFormSubmissions} />
        { tableRows.length > 0 && <Download /> }
      </div>

      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Submitted</th>
            <th scope="col">Data</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          { tableRows.length > 0 ? tableRows : <p className="mt-2 text-center">This form has 0 submissions</p> }
        </tbody>
      </table>
      { submissionModels }
    </>
  );
}
