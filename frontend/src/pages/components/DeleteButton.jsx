import { useNavigate } from 'react-router-dom';

export default function DeleteButton(props) {
  const {
    modalId, heading, text, submitUrl,
  } = props;

  const navigate = useNavigate();

  function handleDelete(event) {
    const { target } = event;
    target.disabled = true;
    setTimeout(() => {
      target.previousElementSibling.click();
      navigate(`/forms?url=${submitUrl}`);
    }, 2000);
  }

  return (
    <>
      <span className="text-danger mt-2" type="button" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
        { heading }
      </span>
      <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{ heading }</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p className="mb-0" style={{ textAlign: 'left' }}>
                {text}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleDelete} type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
