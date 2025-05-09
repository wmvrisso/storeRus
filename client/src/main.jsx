import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Search from './pages/search';
import Cart from './pages/cart';
import Login from './pages/login';
import Signup from './pages/register';
import NotFound from './pages/notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Search />
      },
      {
        path: '/cart',
        element:<Cart />
      },
      {
        path: '/login',
        element:<Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

