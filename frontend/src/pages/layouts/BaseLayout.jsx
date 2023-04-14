import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BaseLayout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main className={location.pathname !== '' && 'mt-5'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
