import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormPageLayout from './layouts/FormPageLayout';
import { handleChangeUtil } from '../utils/form';
import SubmitButton from './components/SubmitButton';

export default function AddForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [formData, setFormData] = useState({ name: '', description: '', successRedirect: '' });
  const handleChange = (event) => handleChangeUtil(event, formData, setFormData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    setTimeout(() => {
      navigate('/form/test');
    }, 1500);
  }

  return (
    <FormPageLayout heading="Create Form">
      <form onSubmit={handleSubmit} className="simple-form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input name="name" required type="text" onChange={handleChange} className="form-control" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input name="description" required type="text" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Success Redirect</label>
          <input name="successRedirect" required type="text" onChange={handleChange} className="form-control" id="exampleInputPassword2" />
        </div>
        <SubmitButton state={formState} />
      </form>
    </FormPageLayout>
  );
}
