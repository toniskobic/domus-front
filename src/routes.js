import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Home from 'src/pages/Home';
import EventDetails from 'src/pages/EventDetails';
import NewEvent from 'src/pages/NewEvent';
import Events from 'src/pages/Events';
import MyEventDetails from 'src/pages/MyEventDetails';
import MyEvents from 'src/pages/MyEvents';
import UpcomingEventDetails from 'src/pages/UpcomingEventDetails';
import UpcomingEvents from 'src/pages/UpcomingEvents';
import NewAd from 'src/pages/NewAd';
import Ads from 'src/pages/Ads';
import MyAds from 'src/pages/MyAds';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Admin from 'src/pages/Admin';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'events', element: <Events /> },
      { path: 'events/:id', element: <EventDetails /> },
      { path: 'myevents', element: <MyEvents /> },
      { path: 'myevents/:id', element: <MyEventDetails /> },
      { path: 'myevents/new', element: <NewEvent /> },
      { path: 'upcomingevents/:id', element: <UpcomingEventDetails /> },
      { path: 'upcomingevents', element: <UpcomingEvents /> },
      { path: 'ads', element: <Ads /> },
      { path: 'myads', element: <MyAds /> },
      { path: 'myads/new', element: <NewAd /> },
      { path: 'admin', element: <Admin />},
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
