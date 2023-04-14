import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import { handleChangeUtil, checkPasswords } from '../utils/form';
import SubmitButton from './components/SubmitButton';

export default function Register() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [formData, setFormData] = useState({ email: '', password: '', password1: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    const error = checkPasswords(formData.password, formData.password1);
    if (error) {
      setFormState({ status: 'error', message: error });
    } else {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }

  return (
    <FormPageLayout heading="Register">
      <form onSubmit={handleSubmit} className="simple-form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input name="email" required type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name="password" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input name="password1" required type="password" onChange={handleChange} className="form-control" id="exampleInputPassword2" />
        </div>
        <p>
          Already have an account?
          <Link to="/login"> Login Here</Link>
        </p>
        <SubmitButton state={formState} />
      </form>
    </FormPageLayout>
  );
}
