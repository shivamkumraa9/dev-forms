import Home from '../pages/Home';
import Api from '../pages/Api';
import Pricing from '../pages/Pricing';
import Contact from '../pages/Contact';

export default [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'api',
    element: <Api />,
  },
  {
    path: 'contact-us',
    element: <Contact />,
  },
  {
    path: 'pricing',
    element: <Pricing />,
  },
];
