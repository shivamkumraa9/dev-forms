import { useState } from 'react';
import http from '../../../utils/http';

export default function Refresh({ formId, setFormSubmissions }) {
  const [text, setText] = useState('Refresh');
  function handleRefresh() {
    setText('Refreshing');
    http.get(`forms/${formId}/submissions`)
      .then((response) => {
        setText('Refresh');
        setFormSubmissions(response.data);
      });
  }
  return (
    <h6 style={{ cursor: 'pointer' }} onClick={handleRefresh} aria-hidden="true">
      <i className="fas fa-sync-alt hawa" />
      &nbsp;&nbsp;
      {text}
    </h6>
  );
}
