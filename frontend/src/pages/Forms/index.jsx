import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SectionLoader } from '../components/Loader';
import FormCard from './FormCard';
import NoFormsAlert from './NoFormAlert';

export default function Forms() {
  const [forms, setForms] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setForms([
        {
          id: 'test',
          name: 'Logical Devs',
          totalSubmissions: 12,
          createdAt: '9 March 2023',
        },
        {
          id: 'test1',
          name: 'Logical Devs',
          totalSubmissions: 12,
          createdAt: '9 March 2023',
        },
        {
          id: 'test2',
          name: 'Logical Devs',
          totalSubmissions: 12,
          createdAt: '9 March 2023',
        },
        {
          id: 'test3',
          name: 'Logical Devs',
          totalSubmissions: 12,
          createdAt: '9 March 2023',
        },
      ]);
    }, 2000);
  }, []);

  if (forms === null) {
    return <SectionLoader />;
  }

  const formCards = forms.map((item) => (<FormCard form={item} />));

  return (
    <section id="contact" className="container">
      <div className="mb-4 d-flex flex-row justify-content-between align-items-center">
        <h1 className="fw-bold">
          Your Forms
        </h1>
        <h2>
          <Link to="/create-new"><i style={{ color: 'rgb(68,68,68)' }} className="fa-solid fa-circle-plus" /></Link>
        </h2>
      </div>

      <div className="row mx-2">
        {formCards.length > 0 ? formCards : <NoFormsAlert />}
      </div>
    </section>
  );
}
