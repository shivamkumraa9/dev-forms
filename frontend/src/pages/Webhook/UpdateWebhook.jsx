import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WebhookForm from './WebhookForm';
import DeleteButton from '../components/DeleteButton';
import { SectionLoader } from '../components/Loader';
import http from '../../utils/http';

export default function UpdateWebhook() {
  const { id } = useParams();
  const [formState, setFormState] = useState('loading');
  const [webhookDetails, setWebhookDetails] = useState(null);
  const [formId, setFormId] = useState('');

  useEffect(() => {
    http.get(`webhooks/${id}`)
      .then((response) => {
        setFormId(response.data.form);
        delete response.data._id;
        delete response.data.__v;
        delete response.data.form;
        setFormState('');
        setWebhookDetails(response.data);
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
        <div className="alert alert-info" role="alert">
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
      <WebhookForm initialData={webhookDetails} submitUrl={`webhooks/update/${id}`} formId={formId} />
      <DeleteButton redirectUrl={`/form/${formId}`} modalId={id} submitUrl={`webhooks/${id}`} heading="Delete Webhook" text="Are you sure that you want to delete this webhook" />
    </section>
  );
}
