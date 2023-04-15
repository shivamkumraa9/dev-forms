import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import SubmitButton from './components/SubmitButton';
import http from '../utils/http';

export default function ResetPassword() {
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    http.post('auth/reset-password', { email })
      .then(() => {
        setFormState({
          status: 'success',
          message: `A link with instructions to reset password has been sent to ${email}`,
        });
      })
      .catch((error) => {
        setFormState({ status: 'error', message: error.response.data.error });
      });
  }

  return (
    <FormPageLayout heading="Reset Password">
      {
        formState.status === 'success'
          ? (
            <div className="alert alert-primary" role="alert">
              {formState.message}
            </div>
          )
          : (
            <form onSubmit={handleSubmit} className="simple-form mt-2">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input name="email" required type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" id="exampleInputEmail1" />
              </div>
              <SubmitButton state={formState} />
            </form>
          )
      }
    </FormPageLayout>
  );
}
