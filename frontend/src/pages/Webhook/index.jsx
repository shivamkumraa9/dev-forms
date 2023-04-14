import WebhookForm from './WebhookForm';

export default function CreateUpdateWebhook() {
  const initialData = {
    name: '',
    url: '',
    auth_username: '',
    auth_password: '',
    enabled: true,
    headers: [{ itemKey: 0, key: '', value: '' }],
    staticKeys: [{ itemKey: 0, key: '', value: '' }],
  };

  return (
    <section className="container">
      <h1 className="fw-bold">
        Create Webhook
      </h1>
      <WebhookForm initialData={initialData} submitUrl="https://" />
    </section>
  );
}
