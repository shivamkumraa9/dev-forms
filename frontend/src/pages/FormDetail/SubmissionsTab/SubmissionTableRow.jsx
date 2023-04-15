import CopyToClipboard from '../../components/CopyToClipboard';

export default function SubmissionTableRow({ submission, index }) {
  const data = JSON.stringify(submission.data);
  return (
    <tr>
      <th scope="row" data-bs-toggle="modal" data-bs-target={`#${submission._id}`}>{ index + 1 }</th>
      <td data-bs-toggle="modal" data-bs-target={`#${submission._id}`}>{ submission.submitted }</td>
      <td data-bs-toggle="modal" data-bs-target={`#${submission._id}`}>{ data }</td>
      <td className="text-right">
        <CopyToClipboard text={data} fontSize="18px" />
        &nbsp;&nbsp;
        <i
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          className="fas fa-times-circle"
          data-bs-toggle="modal"
          data-bs-target={`#${submission._id}`}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
}
