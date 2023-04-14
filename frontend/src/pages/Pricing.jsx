import { useState, useEffect } from 'react';
/* eslint-disable no-param-reassign */
import { useNavigate } from 'react-router-dom';
import { Loader, SectionLoader } from './components/Loader';
import { useAuthToken } from '../utils/authContext';

export default function Pricing() {
  const token = useAuthToken();
  const [isLoading, setIsLoading] = useState(!!token);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setCurrentPlan('free');
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  if (isLoading) {
    return <SectionLoader />;
  }
  return (
    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Pricing</h2>
          <p>
            Choose the payment option that best fits your requirements, with all
            plans priced in Indian Rupees(₹).
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6" data-aos="zoom-im" data-aos-delay="100">
            <div className="box">
              <h3>Free</h3>
              <h4>
                <sup>₹</sup>
                0
                <span> / month</span>
              </h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>500 Monthly Submissions</li>
                <li>Download Data</li>
                <li>Disable Form Submissions</li>
                <li className="na">Email Notification</li>
                <li className="na">Webhook Integration</li>
                <li className="na">API Access</li>
              </ul>
              <div className="btn-wrap">
                <SubscriptionButton currentPlan={currentPlan} planName="free" />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box featured">
              <h3>Developer</h3>
              <h4>
                <sup>₹</sup>
                299
                <span> / month</span>
              </h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>1100 Monthly Submissions</li>
                <li>Download Data</li>
                <li>Disable Form Submissions</li>
                <li>Email Notification</li>
                <li className="na">Webhook Integration</li>
                <li className="na">API Access</li>
              </ul>
              <div className="btn-wrap">
                <SubscriptionButton loaderColor="#fff" currentPlan={currentPlan} planName="developer" />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="100">
            <div className="box">
              <h3>Business</h3>
              <h4>
                <sup>₹</sup>
                799
                <span> / month</span>
              </h4>
              <ul>
                <li>Unlimited Forms</li>
                <li>Unlimited Submissions</li>
                <li>Download Data</li>
                <li>Disable Form Submissions</li>
                <li>Email Notification</li>
                <li>Webhook Integration</li>
                <li>API Access</li>
              </ul>
              <div className="btn-wrap">
                <SubscriptionButton currentPlan={currentPlan} planName="business" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SubscriptionButton(props) {
  const navigate = useNavigate();
  const { planName, currentPlan, loaderColor } = props;
  const [isLoading, setIsLoading] = useState(false);
  const isCurrentPlanSame = planName === currentPlan;

  function handleClick() {
    if (currentPlan) {
      if (!isCurrentPlanSame) {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/register');
        }, 2000);
      }
    } else {
      navigate('/login');
    }
  }
  if (isLoading) {
    return <Loader color={loaderColor} />;
  }
  return (
    <span style={{ cursor: !isCurrentPlanSame ? 'pointer' : '' }} className="btn-buy" aria-hidden="true" onClick={handleClick}>
      {isCurrentPlanSame ? 'Selected' : 'Buy'}
    </span>
  );
}
