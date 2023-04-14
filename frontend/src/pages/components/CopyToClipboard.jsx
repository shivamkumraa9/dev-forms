import { useState } from 'react';

export default function CopyToClipboard({ text, fontSize }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(text);
    setIsClicked(true);
    setTimeout(() => { setIsClicked(false); }, 3000);
  }
  return (
    <i
      onClick={handleClick}
      aria-hidden="true"
      style={{ fontSize, cursor: 'pointer' }}
      className={isClicked ? 'fa-solid fa-clipboard' : 'fa-regular fa-clipboard'}
    />
  );
}
