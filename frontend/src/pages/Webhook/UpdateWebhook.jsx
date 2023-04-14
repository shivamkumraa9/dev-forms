import { useEffect, useState } from 'react';
import WebhookForm from './WebhookForm';
import DeleteButton from '../components/DeleteButton';
import { SectionLoader } from '../components/Loader';

export default function UpdateWebhook() {
  const [formState, setFormState] = useState('loading');
  const [webhookDetails, setWebhookDetails] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setFormState('');
      setWebhookDetails({
        id: 'test',
        name: 'test',
        url: 'test',
        auth_username: '',
        auth_password: '',
        enabled: true,
        headers: [{ itemKey: 0, key: 'test', value: 'test' }],
        staticKeys: [],
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
          The Webhook your are looking for does not exists
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <h1 className="fw-bold">
        Update Webhook
      </h1>
      <WebhookForm initialData={webhookDetails} submitUrl="https://" />
      <DeleteButton modalId={webhookDetails.id} submitUrl="test" heading="Delete Form" text="Are you sure that you want to delete this webhook" />
    </section>
  );
}
