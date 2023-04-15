import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import { handleChangeUtil } from '../utils/form';
import { useAuthTokenDispatch } from '../utils/authContext';
import SubmitButton from './components/SubmitButton';
import http from '../utils/http';

export default function Login() {
  const authTokenDispatch = useAuthTokenDispatch();
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    http.post('auth/login', formData)
      .then((response) => {
        authTokenDispatch({ type: 'login', token: response.data.token });
      })
      .catch((error) => {
        setFormState({ status: 'error', message: error.response.data.error });
      });
  }

  return (
    <FormPageLayout heading="Login">
      <form onSubmit={handleSubmit} className="simple-form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input name="email" required type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name="password" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <p>
          Forget Password?
          <Link to="/reset-password"> Reset Here</Link>
        </p>
        <SubmitButton state={formState} />
      </form>
    </FormPageLayout>
  );
}
