import { Link } from 'react-router-dom';

export default function FormCard({ form }) {
  return (
    <Link key={form.id} className="col-lg-4 col-md-6 col-sm-12 pe-md-4 mb-3" to={`/form/${form.id}`} style={{ paddingLeft: '0px' }}>
      <div className="rounded-3 p-0 shadow form-list-item">
        <h3 className="p-4 mb-0 fw-bold" style={{ color: 'rgb(68,68,68)' }}>{form.name}</h3>
        <div style={{ fontSize: '15px', color: 'black' }} className="ps-3 py-2 mt-0 form-list-item-details">
          <b>{form.totalSubmissions}</b>
          &nbsp;Submissions
          <br />
          <span style={{ fontSize: '15px' }} className="fst-italic">
            Created at&nbsp;
            {form.createdAt}
          </span>
        </div>
      </div>
    </Link>
  );
}
