/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('expiration') == null) {
      navigate('/home', { replace: true });
    } else {
      const future = new Date(localStorage.getItem('expiration'));
      if (Date.now() > Date.parse(future)) {
        navigate('/home', { replace: true });
      }
    }

    setUsername(
      localStorage.getItem('username') ? localStorage.getItem('username') : ''
    );
    setName(
      localStorage.getItem('firstname')
        ? localStorage
          .getItem('firstname')
          .concat(' ', localStorage.getItem('lastname'))
        : ''
    );
  }, []);

  const logout = () => {
    setUsername('');
    setName('');
    localStorage.removeItem('id');
    localStorage.removeItem('dormitoryId');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    navigate('/home', { replace: true });
  };

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar logout={logout} onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        username={username}
        name={name}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
