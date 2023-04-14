import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleChangeUtil } from '../../utils/form';
import SubmitButton from '../components/SubmitButton';
import KeyValuePair from './KeyValuePair';

export default function WebhookForm({ initialData, submitUrl }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ status: '', message: '' });
  const [headers, setHeaders] = useState(initialData.headers);
  const [staticKeys, setStaticKeys] = useState(initialData.staticKeys);
  const [data, setData] = useState(initialData);

  const handleChange = (event) => handleChangeUtil(event, data, setData);

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    setTimeout(() => {
      setFormState({ status: 'error', message: submitUrl });
    }, 1500);
    setTimeout(() => {
      navigate(`/forms?url=${submitUrl}`);
    }, 3500);
  }

  return (
    <form onSubmit={handleSubmit} className="simple-form">
      <p className="fs-6">
        The Webhook Action sends a POST to a URL whenever your form receives a submission.
      </p>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Webhook Action Name</label>
        <input name="name" onChange={handleChange} value={data.name} type="text" placeholder="Google webhook" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">Webhook URL Endpoint *</label>
        <input name="url" onChange={handleChange} value={data.url} type="text" placeholder="https://www.google.com/path/" className="form-control" id="url" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Basic Auth </label>
        <div className="d-flex flex-row gap-3 align-items-center">
          <input type="text" onChange={handleChange} name="auth_username" value={data.auth_username} placeholder="Username" className="form-control" id="exampleInputPassword1" />
          <input type="text" onChange={handleChange} name="auth_password" value={data.auth_password} placeholder="Password" className="form-control" id="exampleInputPassword1" />
        </div>
      </div>
      <div className="mb-3">
        <KeyValuePair keyValueArray={headers} setKeyValueArray={setHeaders} heading="Headers" />
      </div>
      <div className="mb-3">
        <KeyValuePair keyValueArray={staticKeys} setKeyValueArray={setStaticKeys} heading="Static Keys" />
        <div id="emailHelp" className="form-text">Static keys are added to every single POST exactly as written.</div>
      </div>
      <div className="mb-3 form-check">
        <input name="enabled" onChange={handleChange} checked={data.enabled} type="checkbox" className="form-check-input custom-check-button" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Enable</label>
      </div>
      <SubmitButton state={formState} isSizeSmall={1} />
    </form>
  );
}
