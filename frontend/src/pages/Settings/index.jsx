import { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDetails';
import PaymentDetails from './PaymentDetails';
import { SectionLoader } from '../components/Loader';
import http from '../../utils/http';

export default function Settings() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    http.get('profile')
      .then((response) => {
        setProfileData(response.data);
      });
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
