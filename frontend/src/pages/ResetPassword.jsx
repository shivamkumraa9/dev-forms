import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import SubmitButton from './components/SubmitButton';

export default function ResetPassword() {
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    setTimeout(() => {
      setFormState({
        status: 'success',
        message: `A link with instructions to reset password has been sent to ${email}`,
      });
    }, 1500);
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
