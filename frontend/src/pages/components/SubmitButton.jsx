import { Loader } from './Loader';

export default function SubmitButton({ state, heading, isSizeSmall }) {
  const { status, message } = state;

  if (status === 'loading') return <div className={isSizeSmall ? '' : 'text-center'}><Loader /></div>;

  let element = '';
  if (status === 'success') {
    element = <p className="text-success">{message}</p>;
  } else if (status === 'error') {
    element = <p className="text-danger">{message}</p>;
  }

  return (
    <>
      {element}
      <div className={isSizeSmall ? '' : 'd-grid gap-3'}>
        <button type="submit" className="custom-button primary-button">{ heading || 'Submit' }</button>
      </div>
    </>
  );
}
