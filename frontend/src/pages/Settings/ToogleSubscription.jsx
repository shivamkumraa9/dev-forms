import { useRef, useState } from 'react';
import { Loader } from '../components/Loader';

export default function ToogleSubscription({ profileData, setProfileData }) {
  const [isLoading, setIsLoading] = useState(false);
  const closeBtn = useRef(null);

  const buttonClass = profileData.isCancelled ? 'btn btn-primary' : 'btn btn-danger';
  const buttonText = profileData.isCancelled ? ' Resume ' : ' Cancel ';

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => {
      setProfileData({
        ...profileData,
        isCancelled: !profileData.isCancelled,
      });
      setIsLoading(false);
      closeBtn.current.click();
    }, 1500);
  }

  return (
    <>
      <button type="button" className={`${buttonClass} btn-sm ms-2`} data-bs-toggle="modal" data-bs-target="#cancelSubscription">
        {buttonText}
      </button>

      <div className="modal fade" id="cancelSubscription" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Are you Sure?</h1>
              <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p className="mb-0" style={{ textAlign: 'left' }}>
                Are you really want to
                {buttonText}
                your plan?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {
                isLoading
                  ? <Loader />
                  : (
                    <button onClick={handleClick} type="button" className={buttonClass}>
                      {buttonText}
                      Plan
                    </button>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
