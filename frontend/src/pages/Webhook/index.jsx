import { useParams } from 'react-router-dom';
import WebhookForm from './WebhookForm';

export default function CreateUpdateWebhook() {
  const { id } = useParams();
  const initialData = {
    name: '',
    url: '',
    authUsername: '',
    authPassword: '',
    isEnabled: true,
    headers: [{ _id: 0, key: '', value: '' }],
    staticKeys: [{ _id: 0, key: '', value: '' }],
  };

  return (
    <section className="container">
      <h1 className="fw-bold">
        Create Webhook
      </h1>
      <WebhookForm initialData={initialData} submitUrl={`webhooks/${id}`} formId={id} />
    </section>
  );
}
