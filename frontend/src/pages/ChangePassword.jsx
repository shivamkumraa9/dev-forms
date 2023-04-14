import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import { handleChangeUtil, checkPasswords } from '../utils/form';
import SubmitButton from './components/SubmitButton';

export default function ChangePassword() {
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [formData, setFormData] = useState({ currentPassword: '', password: '', password1: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    const error = checkPasswords(formData.password, formData.password1);
    if (error) {
      setFormState({ status: 'error', message: error });
    } else {
      setTimeout(() => {
        setFormState({ status: 'success', message: 'Password has been set!' });
      }, 1500);
    }
  }

  return (
    <FormPageLayout>
      <h1 className="mb-3 text-center">Change Password</h1>
      <form onSubmit={handleSubmit} className="simple-form mt-2">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">Current Password</label>
          <input name="currentPassword" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name="password" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input name="password1" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword2" />
        </div>
        <SubmitButton state={formState} />
      </form>
    </FormPageLayout>
  );
}
