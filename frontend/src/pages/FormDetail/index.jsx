import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InstallTab from './InstallTab';
import SettingsTab from './SettingsTab';
import SubmissionTab from './SubmissionsTab';
import WebhookTab from './WebhookTab';
import { SectionLoader } from '../components/Loader';
import http from '../../utils/http';

export default function FormDetail() {
  const { id } = useParams();
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
    http.get(`forms/${id}`)
      .then((response) => {
        setFormState('');
        setFormDetails(response.data);
      })
      .catch(() => {
        setFormState('notfound');
      });
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
          { formDetails.form.name }
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
          <InstallTab formId={formDetails.form._id} />
        </div>
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
          <SubmissionTab submissions={formDetails.submissions} formId={formDetails.form._id} />
        </div>
        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
          <SettingsTab formDetails={formDetails.form} plan={formDetails.plan} />
        </div>
        <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">
          <WebhookTab webhooks={formDetails.webhooks} plan={formDetails.plan} />
        </div>
      </div>
    </section>
  );
}
