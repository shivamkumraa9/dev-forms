import { useState } from 'react';

export default function Refresh({ formId, setFormSubmissions }) {
  const [text, setText] = useState('Refresh');
  function handleRefresh() {
    setText('Refreshing');
    setTimeout(() => {
      setText('Refresh');
      setFormSubmissions([
        {
          id: 1,
          submitted: '3 April 2023',
          data: '{"test": "foo", "testss": [1, 2, 3]}',
        },
        {
          id: 2,
          submitted: '4 April 2023',
          data: `{"test": "${formId}", "testss": [1, 2, 3]}`,
        },
        {
          id: 3,
          submitted: '4 April 2023',
          data: '{"test": "foo", "testss": [1, 2, 3]}',
        },
      ]);
    }, 1500);
  }
  return (
    <h6 style={{ cursor: 'pointer' }} onClick={handleRefresh} aria-hidden="true">
      <i className="fas fa-sync-alt hawa" />
      &nbsp;&nbsp;
      {text}
    </h6>
  );
}
