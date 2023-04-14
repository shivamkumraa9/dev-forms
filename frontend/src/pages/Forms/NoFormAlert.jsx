import { Link } from 'react-router-dom';

export default function NoFormsAlert() {
  return (
    <div className="alert alert-warning" role="alert">
      You have 0 forms.
      <Link to="/create-new">Click here </Link>
      to create a new form
    </div>
  );
}
