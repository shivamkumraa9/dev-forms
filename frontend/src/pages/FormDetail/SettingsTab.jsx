import { useState } from 'react';
import { handleChangeUtil } from '../../utils/form';
import SubmitButton from '../components/SubmitButton';
import DeleteButton from '../components/DeleteButton';
import http from '../../utils/http';

export default function SettingsTab({ formDetails, plan }) {
  const {
    name, description, successRedirectUrl, allowNewSubmissions,
  } = formDetails;
  const sendEmailNotifications = (
    !plan.allowEmailNotifications ? false : formDetails.sendEmailNotifications);
  const [formData, setFormData] = useState({
    name, description, successRedirectUrl, allowNewSubmissions, sendEmailNotifications,
  });
  const [formState, setFormState] = useState({ status: '', message: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    http.put(`forms/${formDetails._id}`, formData)
      .then(() => {
        setFormState({ status: '', message: '' });
      })
      .catch((error) => {
        setFormState({ status: 'error', message: error.response.data.error });
      });
  }

  return (
    <form className="simple-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name *</label>
        <input type="text" required className="form-control" id="name" name="name" onChange={handleChange} value={formData.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description *</label>
        <input type="text" required className="form-control" id="description" name="description" onChange={handleChange} value={formData.description} />
      </div>
      <div className="mb-3">
        <label htmlFor="successRedirectUrl" className="form-label">Success Redirect</label>
        <input type="text" className="form-control" id="successRedirectUrl" name="successRedirectUrl" onChange={handleChange} value={formData.successRedirectUrl} />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input custom-check-button" name="allowNewSubmissions" onChange={handleChange} checked={formData.allowNewSubmissions} />
        <label className="form-check-label" htmlFor="exampleCheck1">Allow new Submissions</label>
      </div>
      <div className="mb-3 form-check">
        <input disabled={!plan.allowEmailNotifications} type="checkbox" className="form-check-input custom-check-button" name="sendEmailNotifications" onChange={handleChange} checked={formData.sendEmailNotifications} />
        <label className="form-check-label" htmlFor="exampleCheck1">Send Email Notifications</label>
      </div>
      { !plan.allowEmailNotifications && (
        <div className="alert alert-warning" role="alert">
          Please Upgrade to recieve email notifications for each submission
        </div>
      )}
      <SubmitButton state={formState} isSizeSmall={1} heading="Update Details" />
      <DeleteButton modalId={formDetails._id} submitUrl={`forms/${formDetails._id}`} heading="Delete Form" text="Are you sure that you want to delete this form" />
    </form>
  );
}
