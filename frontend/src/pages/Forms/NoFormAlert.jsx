import { Link } from 'react-router-dom';

export default function NoFormsAlert() {
  return (
    <div className="alert alert-info" role="alert">
      You have 0 forms.
      <Link to="/add-form">Click here </Link>
      to create a new form
    </div>
  );
}
