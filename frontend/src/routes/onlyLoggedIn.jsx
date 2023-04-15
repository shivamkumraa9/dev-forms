import { OnlyAllowLoggedInUsers } from '../pages/components/RoutesProtection';

import Settings from '../pages/Settings';
import Forms from '../pages/Forms';
import AddForm from '../pages/AddForm';
import ChangePassword from '../pages/ChangePassword';
import FormDetail from '../pages/FormDetail';
import Logout from '../pages/Logout';
import CreateWebhook from '../pages/Webhook';
import UpdateWebhook from '../pages/Webhook/UpdateWebhook';

export default {
  element: <OnlyAllowLoggedInUsers />,
  children: [
    {
      path: 'add-form',
      element: <AddForm />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
    {
      path: 'forms',
      element: <Forms />,
    },
    {
      path: 'form/:id',
      element: <FormDetail />,
    },
    {
      path: 'logout',
      element: <Logout />,
    },
    {
      path: 'create-webhook/:id',
      element: <CreateWebhook />,
    },
    {
      path: 'update-webhook/:id',
      element: <UpdateWebhook />,
    },
    {
      path: 'change-password',
      element: <ChangePassword />,
    },
  ],
};
