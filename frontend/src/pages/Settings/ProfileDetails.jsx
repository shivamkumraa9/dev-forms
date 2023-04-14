import { useState } from 'react';
import SettingsCard from './SettingsCard';
import SubmitButton from '../components/SubmitButton';

export default function ProfileDetails({ profileData }) {
  const { plan, email, apiKey } = profileData;
  const [newApikey, setNewApiKey] = useState('');
  const [formState, setFormState] = useState({ status: '', message: '' });

  function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });
    setTimeout(() => {
      setNewApiKey('112345678978');
      setFormState({ status: '' });
    }, 1500);
  }

  return (
    <SettingsCard>
      <h1 className="mb-3 text-center">Profile Details</h1>
      <form onSubmit={handleSubmit} className="simple-form mt-2">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input disabled value={email} type="text" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="api" className="form-label">API Key</label>
          <input type="text" disabled value={newApikey || apiKey} className="form-control" id="api" />
          {
            plan === 'free' && <div id="emailHelp" className="form-text text-danger">Please Upgrade your plan to get access of API</div>
          }
        </div>
        <SubmitButton state={formState} heading="Refresh API Key" />
      </form>
    </SettingsCard>
  );
}
