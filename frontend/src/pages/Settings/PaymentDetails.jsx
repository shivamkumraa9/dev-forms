import { Link } from 'react-router-dom';
import SettingsCard from './SettingsCard';
import PaymentHistory from './PaymentHistory';
import ToogleSubscription from './ToogleSubscription';

export default function PaymentDetails({ profileData, setProfileData }) {
  return (
    <SettingsCard>
      <div className="mt-0 text-center">
        <h1 className="mb-0">
          Current Plan:
          <b>
            &nbsp;
            {profileData.plan}
          </b>
          <br />
          { profileData.plan !== 'free' && (
          <span style={{ fontSize: '16px' }}>
            { profileData.isCancelled ? 'Your subscriotion ends ' : 'Next Payment ' }
            on :&nbsp;
            {profileData.nextPaymentDate}
          </span>
          )}
        </h1>
        <div className="mt-1" />
        <Link to="/pricing" className="btn btn-secondary btn-sm">Change Plan</Link>
        { profileData.plan !== 'free' && <ToogleSubscription profileData={profileData} setProfileData={setProfileData} /> }
        { profileData.paymentHistory.length > 0
          && <PaymentHistory paymentHistory={profileData.paymentHistory} />}
      </div>
    </SettingsCard>
  );
}
