import { Link, useParams } from 'react-router-dom';

export default function WebhookTab({ webhooks, plan }) {
  const { id } = useParams();
  if (!plan.allowWebhookIntegration) {
    return (
      <div className="alert alert-info" role="alert">
        Please upgrade your plan to get access to webhooks.
      </div>
    );
  }
  const tableRows = webhooks.map((item, index) => (
    <tr key={item._id}>
      <th scope="row">{index + 1}</th>
      <td>{ item.name }</td>
      <td>{ item.url }</td>
      <td className="text-right">{ item.isEnabled ? 'Enabled' : 'Disabled' }</td>
      <td>
        <Link to={`/update-webhook/${item._id}`}>
          Edit
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <Link to={`/create-webhook/${id}`} className="custom-button primary-button">
        <span>
          Create New Webhook&nbsp;
          <i className="fa-solid fa-circle-plus" />
        </span>
      </Link>
      <table className="table table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">URL Endpoint</th>
            <th scope="col">Status</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          { tableRows.length > 0 ? tableRows : <p className="mt-2 text-center">This form has 0 webhooks</p> }
        </tbody>
      </table>
    </>
  );
}
