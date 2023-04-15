import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import { handleChangeUtil, checkPasswords } from '../utils/form';
import SubmitButton from './components/SubmitButton';
import http from '../utils/http';

export default function ChangePassword() {
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [formData, setFormData] = useState({ oldPassword: '', password: '', password1: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    const error = checkPasswords(formData.password, formData.password1);
    if (error) {
      setFormState({ status: 'error', message: error });
    } else {
      http.post('profile/change-password', formData)
        .then(() => {
          setFormState({ status: 'success', message: 'Password has been set!' });
        })
        .catch((responseError) => {
          setFormState({ status: 'error', message: responseError.response.data.error });
        });
    }
  }

  return (
    <FormPageLayout>
      <h1 className="mb-3 text-center">Change Password</h1>
      <form onSubmit={handleSubmit} className="simple-form mt-2">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">Current Password</label>
          <input name="oldPassword" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword" />
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
