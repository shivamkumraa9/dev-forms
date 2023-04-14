import { useEffect, useState } from 'react';
import InstallTab from './InstallTab';
import SettingsTab from './SettingsTab';
import SubmissionTab from './SubmissionsTab';
import WebhookTab from './WebhookTab';
import { SectionLoader } from '../components/Loader';

export default function FormDetail() {
  const [formState, setFormState] = useState('loading');
  const [formDetails, setFormDetails] = useState({
    name: '',
    description: '',
    successRedirect: '',
    enabled: true,
    isEmailNotiEnabled: false,
    userPlan: '',
    submissions: [],
    webhooks: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setFormState('');
      setFormDetails({
        id: 'test',
        name: 'test',
        description: 'test',
        successRedirect: 'https://google.com/',
        enabled: true,
        isEmailNotiEnabled: false,
        userPlan: 'business',
        submissions: [
          {
            id: 1,
            submitted: '3 April 2023',
            data: '{"test": "foo", "testss": [1, 2, 3]}',
          },
          {
            id: 2,
            submitted: '4 April 2023',
            data: '{"test": "foo", "testss": [1, 2, 3]}',
          },
        ],
        webhooks: [
          {
            id: 1,
            name: 'my webhook',
            url: 'https://gmail.com',
            auth_username: 'shivam',
            auth_password: 'kumraa',
            enabled: true,
            headers: [
              {
                key: 'test',
                value: 'test',
              },
            ],
            static_keys: [
              {
                key: 'test',
                value: 'test',
              },
            ],
          },
          {
            id: 2,
            name: 'my webhook2',
            url: 'https://gmail.com2',
            auth_username: 'shivam',
            auth_password: 'kumraa',
            enabled: false,
            headers: [],
            static_keys: [],
          },
        ],
      });
    }, 2000);
  }, []);

  if (formState === 'loading') {
    return <SectionLoader />;
  }

  if (formState === 'notfound') {
    return (
      <section className="container">
        <div className="alert alert-danger" role="alert">
          The form your are looking for does not exists
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="mb-4 d-flex flex-row justify-content-between align-items-center">
        <h1 className="fw-bold">
          { formDetails.name }
        </h1>
      </div>
      <ul className="nav nav-tabs mb-3 my-tab" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Install</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Submissions</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Settings</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">Webhooks</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
          <InstallTab formId={formDetails.id} />
        </div>
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
          <SubmissionTab submissions={formDetails.submissions} formId={formDetails.id} />
        </div>
        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
          <SettingsTab formDetails={formDetails} />
        </div>
        <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">
          <WebhookTab webhooks={formDetails.webhooks} />
        </div>
      </div>
    </section>
  );
}
