import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Loader } from '../components/Loader';
import http from '../../utils/http';

function NonLoggedInBuyButton() {
  return (
    <Link className="btn-buy" to="/login">
      Buy
    </Link>
  );
}

function CurrentPlanButton() {
  return (
    <span className="btn-buy" aria-hidden="true">
      Current Plan
    </span>
  );
}

function SubscribeButton({ planName, loaderColor }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    http.post(`payments/subscribe/${planName}`)
      .then((response) => {
        window.location.href = response.data.url;
      });
  }
  if (isLoading) {
    return <Loader color={loaderColor} />;
  }

  return (
    <span style={{ cursor: 'pointer' }} className="btn-buy" aria-hidden="true" onClick={handleClick}>
      Buy
    </span>
  );
}

function ChangePlanButton({ planName }) {
  const [isLoading, setIsLoading] = useState(false);
  const closeBtn = useRef(null);
  const navigate = useNavigate();

  function handleClick() {
    setIsLoading(true);
    http.post(`payments/change-plan/${planName}`)
      .then(() => {
        setTimeout(() => {
          closeBtn.current.click();
          navigate('/settings');
        }, 2000);
      });
  }
  return (
    <>
      <span style={{ cursor: 'pointer' }} className="btn-buy" type="button" data-bs-toggle="modal" data-bs-target={`#changePlan${planName}`}>
        Buy
      </span>
      <div className="modal fade" id={`changePlan${planName}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Change Plan</h1>
              <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Are you sure you want to change your plan to&nbsp;
              {planName}
              ?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {
                isLoading
                  ? <Loader />
                  : <button type="button" className="btn btn-dark" onClick={handleClick}>Change Plan</button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ButtonRenderer({ planName, currentPlan, loaderColor }) {
  if (!currentPlan) {
    return <NonLoggedInBuyButton />;
  }

  if (currentPlan === planName) {
    return <CurrentPlanButton />;
  }

  if (currentPlan === 'free') {
    return <SubscribeButton planName={planName} loaderColor={loaderColor} />;
  }

  if (planName !== 'free') {
    return <ChangePlanButton planName={planName} loaderColor={loaderColor} />;
  }
}
