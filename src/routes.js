import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Home from 'src/pages/Home';
import NewEvent from 'src/pages/NewEvent';
import Events from 'src/pages/Events';
import NewAd from 'src/pages/NewAd';
import Ads from 'src/pages/Ads';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'events', element: <Events /> },
      { path: 'events/new', element: <NewEvent /> },
      { path: 'ads/new', element: <NewAd /> },
      { path: 'ads', element: <Ads /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/events" /> },
      { path: '*', element: <Navigate to="/app/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'home', element: <Home /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
