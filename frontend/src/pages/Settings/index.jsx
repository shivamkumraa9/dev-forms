import { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDetails';
import PaymentDetails from './PaymentDetails';
import { SectionLoader } from '../components/Loader';

export default function Settings() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProfileData({
        plan: 'business',
        email: 'shivamkumraa9@gmail.com',
        apiKey: '2345646',
        nextPaymentDate: '28 March 2023',
        isCancelled: true,
        paymentHistory: [
          {
            plan: 'business',
            amount: 19.19,
            status: 'Success',
            date: '29 March 2023',
          },
        ],
      });
    }, 2000);
  }, []);

  if (profileData === null) {
    return <SectionLoader />;
  }

  return (
    <section className="container">
      <PaymentDetails profileData={profileData} setProfileData={setProfileData} />
      <ProfileDetails profileData={profileData} />
    </section>
  );
}
