import CopyToClipboard from '../../components/CopyToClipboard';

export default function SubmissionTableRow({ submission, index }) {
  return (
    <tr key={submission.id}>
      <th scope="row" data-bs-toggle="modal" data-bs-target={`#${submission.id}`}>{ index + 1 }</th>
      <td data-bs-toggle="modal" data-bs-target={`#${submission.id}`}>{ submission.submitted }</td>
      <td data-bs-toggle="modal" data-bs-target={`#${submission.id}`}>{ submission.data }</td>
      <td className="text-right">
        <CopyToClipboard text={submission.data} fontSize="18px" />
        &nbsp;&nbsp;
        <i
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          className="fas fa-times-circle"
          data-bs-toggle="modal"
          data-bs-target={`#${submission.id}`}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
}
