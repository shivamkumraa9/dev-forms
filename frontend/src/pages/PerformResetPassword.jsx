import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormPageLayout from './layouts/FormPageLayout';
import { handleChangeUtil, checkPasswords } from '../utils/form';
import SubmitButton from './components/SubmitButton';

export default function PerformResetPassword() {
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [formData, setFormData] = useState({ password: '', password1: '' });
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
    <FormPageLayout heading="Set Password">
      {
        formState.status === 'success'
          ? (
            <div className="alert alert-primary" role="alert">
              Password Changed Successfully.
              <Link to="/login"> Login here </Link>
              to continue
            </div>
          )
          : (
            <form onSubmit={handleSubmit} className="simple-form mt-2">
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
          )
      }
    </FormPageLayout>
  );
}
