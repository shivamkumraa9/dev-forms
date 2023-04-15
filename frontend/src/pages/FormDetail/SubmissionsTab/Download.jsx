import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import http from '../../../utils/http';

export default function Download() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    http.post(`forms/${id}/submissions/download`)
      .then((response) => {
        setIsLoading(false);
        const downloadUrl = window.URL.createObjectURL(
          new Blob([JSON.stringify(response.data, null, 4)]),
        );
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'file.json');
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }

  if (isLoading) return (<span className="me-5"><Loader /></span>);

  return (
    <button type="button" onClick={handleClick} className="custom-button primary-button">
      <span>
        <i className="fas fa-file-download" />
        &nbsp;
        Download
      </span>
    </button>
  );
}
