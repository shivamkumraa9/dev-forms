import { useState } from 'react';
import { handleChangeUtil } from '../../utils/form';
import SubmitButton from '../components/SubmitButton';
import DeleteButton from '../components/DeleteButton';

export default function SettingsTab({ formDetails }) {
  const {
    name, description, successRedirect, enabled, userPlan,
  } = formDetails;
  const isEmailNotiEnabled = userPlan === 'free' ? false : formDetails.isEmailNotiEnabled;
  const [formData, setFormData] = useState({
    name, description, successRedirect, enabled, isEmailNotiEnabled,
  });
  const [formState, setFormState] = useState({ status: '', message: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    setTimeout(() => {
      setFormState({ status: '', message: '' });
      // setFormDetails({ ...formDetails, ...formData });
    }, 1500);
  }

  return (
    <form className="simple-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" required className="form-control" id="name" name="name" onChange={handleChange} value={formData.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" required className="form-control" id="description" name="description" onChange={handleChange} value={formData.description} />
      </div>
      <div className="mb-3">
        <label htmlFor="successRedirect" className="form-label">Success Redirect</label>
        <input type="text" className="form-control" id="successRedirect" name="successRedirect" onChange={handleChange} value={formData.successRedirect} />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input custom-check-button" name="enabled" onChange={handleChange} value={formData.enabled} />
        <label className="form-check-label" htmlFor="exampleCheck1">Submissions Enabled</label>
      </div>
      <div className="mb-3 form-check">
        <input disabled={userPlan === 'free'} type="checkbox" className="form-check-input custom-check-button" name="isEmailNotiEnabled" onChange={handleChange} value={formData.isEmailNotiEnabled} />
        <label className="form-check-label" htmlFor="exampleCheck1">Recieve Email Notifications</label>
      </div>
      { userPlan === 'free' && (
        <div className="alert alert-warning" role="alert">
          Please Upgrade to recieve email notifications for each submission
        </div>
      )}
      <SubmitButton state={formState} isSizeBig={false} heading="Update Details" />
      <DeleteButton modalId={formDetails.id} submitUrl="test" heading="Delete Form" text="Are you sure that you want to delete this form" />
    </form>
  );
}
