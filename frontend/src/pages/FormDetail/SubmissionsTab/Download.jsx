export default function Download({ link }) {
  return (
    <a target="_blank" href={link} className="custom-button primary-button" rel="noreferrer">
      <span>
        <i className="fas fa-file-download" />
        &nbsp;
        Download
      </span>
    </a>
  );
}
